import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, Volume2, Mic, CheckCircle2, RotateCcw } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useLanguage } from '../../hooks/useLanguage';

export default function IVRDemo() {
  const { language, t } = useLanguage();
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (callActive) {
      timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const startCall = () => {
    setCallActive(true);
    setSelectedKey(null);
    setAudioPlaying(true);
    setTranscript([
      {
        sender: 'ivr',
        text: language === 'hi'
          ? 'नमस्ते! किसान सेतु हेल्पलाइन 1800-180-SETU में आपका स्वागत है। टोकन स्थिति के लिए 1 दबाएं, कतार समय के लिए 2 दबाएं, मंडी समय के लिए 3 दबाएं, अधिकारी से बात करने के लिए 4 दबाएं।'
          : 'Welcome to Kisan Setu Toll-Free Helpline. Press 1 for Token status, Press 2 for live Queue position, Press 3 for Centre hours, or Press 4 to speak with procurement officer.',
      },
    ]);
  };

  const endCall = () => {
    setCallActive(false);
    setAudioPlaying(false);
    setSelectedKey(null);
  };

  const handleKeyPress = (key) => {
    if (!callActive) return;
    setSelectedKey(key);
    setAudioPlaying(true);

    let reply = '';
    if (key === '1') {
      reply = language === 'hi'
        ? 'आपका सक्रिय टोकन नंबर RJ-2026-00124 है। फसल: गेहूं, मात्रा: 10 क्विंटल। स्थिति: मंडी गेट पर वाहन प्रवेश स्वीकृत।'
        : 'Your active token is RJ-2026-00124 for Wheat, 10 Quintals. Status: Gate Entry Approved at Kota Mandi Bay 3.';
    } else if (key === '2') {
      reply = language === 'hi'
        ? 'आपकी वर्तमान कतार स्थिति: आपके आगे 3 किसान हैं। अनुमानित प्रतीक्षा समय लगभग 15 मिनट है।'
        : 'Your current queue position: 3 farmers ahead of you. Estimated wait time is approximately 15 minutes.';
    } else if (key === '3') {
      reply = language === 'hi'
        ? 'कोटा कृषि उपज मंडी आज सुबह 8:00 बजे से शाम 5:00 बजे तक खुली है। संपर्क अधिकारी: श्री राजेंद्र सिंह, फोन: 0744-2458900।'
        : 'Kota APMC Procurement Centre is operating today from 8:00 AM to 5:00 PM. In-charge: Mr. Rajendra Singh, Phone: 0744-2458900.';
    } else if (key === '4') {
      reply = language === 'hi'
        ? 'कृपया प्रतीक्षा करें, आपकी कॉल मंडी सहायक श्री महेश कुमार को स्थानांतरित की जा रही है...'
        : 'Please hold while we transfer your call to Assistant Procurement Officer Mr. Mahesh Kumar...';
    } else {
      reply = language === 'hi'
        ? 'अमान्य विकल्प। कृपया 1, 2, 3 या 4 दबाएं।'
        : 'Invalid choice. Please press 1, 2, 3 or 4.';
    }

    setTranscript((prev) => [
      ...prev,
      { sender: 'user', text: `Key Pressed: [ ${key} ]` },
      { sender: 'ivr', text: reply },
    ]);
  };

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
      {/* Phone Keypad Dial Simulation */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full max-w-sm bg-neutral-900 text-white rounded-3xl p-6 shadow-2xl border border-neutral-700">
          {/* Top Notch */}
          <div className="flex justify-between items-center mb-6 text-neutral-400 text-xs">
            <span>Kisan Setu IVR</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Toll Free 1800-180-7388</span>
            </div>
          </div>

          {/* Call Screen Status */}
          <div className="text-center mb-6 p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700">
            {callActive ? (
              <div>
                <Badge variant="success" className="mb-2">Connected</Badge>
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  {formatDuration(callDuration)}
                </div>
                <div className="text-xs text-primary-400 flex items-center justify-center gap-1.5">
                  <Volume2 size={14} className={audioPlaying ? "animate-bounce text-green-400" : ""} />
                  <span>{audioPlaying ? 'Speaking simulated response...' : 'Listening for keypress...'}</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-2 text-neutral-300">
                  <Phone size={20} />
                </div>
                <div className="text-sm font-semibold text-neutral-200">Phone Simulator Ready</div>
                <div className="text-xs text-neutral-400 mt-1">Click Call to simulate IVR voice bot</div>
              </div>
            )}
          </div>

          {/* Keypad Grid (1-9, *, 0, #) */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                disabled={!callActive}
                className={`h-14 rounded-2xl flex flex-col items-center justify-center font-heading text-lg font-bold transition-all ${
                  callActive
                    ? selectedKey === k
                      ? 'bg-primary-600 text-white scale-95 shadow-glow'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white active:scale-95'
                    : 'bg-neutral-800/40 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>{k}</span>
                {k === '1' && <span className="text-[9px] text-neutral-400 font-normal font-body">STATUS</span>}
                {k === '2' && <span className="text-[9px] text-neutral-400 font-normal font-body">QUEUE</span>}
                {k === '3' && <span className="text-[9px] text-neutral-400 font-normal font-body">HOURS</span>}
                {k === '4' && <span className="text-[9px] text-neutral-400 font-normal font-body">OFFICER</span>}
              </button>
            ))}
          </div>

          {/* Call / Hangup Buttons */}
          <div className="flex items-center justify-center gap-4">
            {!callActive ? (
              <button
                onClick={startCall}
                className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-glow transition-all"
              >
                <PhoneCall size={18} />
                <span>Call Kisan Setu (Toll-Free)</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <PhoneOff size={18} />
                <span>End Simulated Call</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Voice Transcript & Instructions */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <Card className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
            <div>
              <h3 className="font-heading font-semibold text-neutral-900 text-base">
                Real-Time Voice Transcript
              </h3>
              <p className="text-xs text-neutral-500">Live bilingual speech audio simulated text stream</p>
            </div>
            {transcript.length > 0 && (
              <button
                onClick={() => setTranscript([])}
                className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
              >
                <RotateCcw size={13} /> Clear
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 min-h-[320px] max-h-[420px] pr-2">
            {transcript.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 p-8">
                <Mic size={36} className="mb-2 opacity-30" />
                <p className="text-sm font-medium">No call in progress</p>
                <p className="text-xs max-w-xs mt-1">
                  Click the green "Call Kisan Setu" button on the phone keypad to simulate an IVR call.
                </p>
              </div>
            ) : (
              transcript.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      item.sender === 'user'
                        ? 'bg-neutral-900 text-white rounded-br-none font-mono'
                        : 'bg-primary-50 text-primary-950 border border-primary-100 rounded-bl-none'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">
                      {item.sender === 'user' ? 'Farmer Keypad' : 'Kisan Setu Voice Engine'}
                    </div>
                    {item.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Feature Explainer Card */}
        <Card className="p-4 bg-amber-50/50 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold block mb-0.5">SIH 2026 Inclusion Feature: Voice Accessibility</span>
              Over 35% of rural farmers operate feature phones without mobile internet. Kisan Setu's automated IVR integration delivers identical queue countdowns, moisture grading and token status via simple toll-free phone calls in regional languages.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}