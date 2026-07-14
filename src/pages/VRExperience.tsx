import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Play, Globe, ChevronLeft, X, Tag, Info, Maximize2, Pause, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VRVideo {
  id: string;
  title: string;
  country: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  tags: string[];
  duration: string;
  sort_order: number;
}

function VideoModal({ video, onClose }: { video: VRVideo; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
    setProgress(pct);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-5xl mx-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-white font-bold text-xl">{video.title}</h2>
            <p className="text-sky-400 text-sm">{video.country}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-red-500/80 rounded-xl text-white/70 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player */}
        <div
          ref={containerRef}
          className="relative w-full bg-black rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-sky-500/20 group"
          style={{ aspectRatio: '16/9' }}
        >
          <video
            ref={videoRef}
            src={video.video_url}
            autoPlay
            loop
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          />

          {/* Controls overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-3">
            {/* Progress */}
            <div
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 bg-white/20 hover:bg-sky-500/70 rounded-full transition-all"
              >
                {playing
                  ? <Pause className="w-5 h-5 text-white" />
                  : <Play className="w-5 h-5 text-white fill-white" />
                }
              </button>
              <button
                onClick={toggleMute}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                {muted
                  ? <VolumeX className="w-4 h-4 text-white" />
                  : <Volume2 className="w-4 h-4 text-white" />
                }
              </button>
              <div className="flex-1" />
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="flex items-start gap-2 flex-1 px-4 py-3 bg-sky-500/10 border border-sky-500/20 rounded-xl">
            <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="text-sky-300/80 text-xs leading-relaxed">
              <span className="font-semibold text-sky-300">Immersive Preview:</span> This is a curated cinematic preview of the destination. Click fullscreen for the best experience. Hover over the video to reveal playback controls.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/8 border border-white/10 rounded-full text-white/60 text-xs font-medium"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VRExperience() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<VRVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VRVideo | null>(null);

  useEffect(() => {
    supabase
      .from('vr_videos')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        setVideos(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Virtual Reality Tours</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/15 border border-sky-500/30 rounded-full text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3 h-3" />
            VR Ready
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/15 border border-sky-500/30 rounded-full text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Headphones className="w-3.5 h-3.5" />
            Exclusive VR Experience
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 leading-tight">
            Visit the World{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Before You Book
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Watch cinematic destination previews and feel the atmosphere before committing to a trip — all inside this page, no app needed.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Choose Your Virtual Destination</h2>
          <span className="text-white/30 text-sm">{videos.length} experiences</span>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-slate-900 animate-pulse" style={{ aspectRatio: '16/9' }} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative text-left rounded-2xl overflow-hidden border border-white/10 hover:border-sky-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/15 transition-all duration-300 focus:outline-none"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                  {/* Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-sky-500/80 group-hover:scale-110 group-hover:border-sky-400 transition-all duration-300 shadow-xl">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-sky-500/90 backdrop-blur-sm rounded-md text-white text-xs font-bold">
                    IMMERSIVE
                  </div>
                  {video.duration && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-white/90 text-xs font-medium">
                      {video.duration}
                    </div>
                  )}
                </div>

                <div className="p-5 bg-slate-900">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-sky-400 transition-colors text-lg leading-tight">
                        {video.title}
                      </h3>
                      <p className="text-white/40 text-sm">{video.country}</p>
                    </div>
                    <Globe className="w-4 h-4 text-sky-400/50 flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{video.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {video.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/40 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center py-12 border-t border-white/10">
          <p className="text-white/30 text-sm mb-2">Ready to make it real?</p>
          <h3 className="text-2xl font-bold text-white mb-6">
            Loved what you saw?{' '}
            <span className="text-sky-400">Book the real thing.</span>
          </h3>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore All Tours
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
