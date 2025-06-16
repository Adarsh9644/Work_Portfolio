"use client"

import { ChevronLeft, ChevronRight, Mail, ExternalLink } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function CenteredVideoPortfolio() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLIFrameElement>(null)

  // Convert Google Drive sharing links to direct embed format
  const convertGoogleDriveUrl = (shareUrl: string) => {
    const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  const videos = [
    {
      shareUrl: "https://drive.google.com/file/d/1_ATvo1pA8_u14KbKSd8_RVUxigpswIVe/view?usp=drive_link",
      title: "Video 1",
      orientation: "vertical",
    },
    {
      shareUrl: "https://drive.google.com/file/d/1CykasXjUsYmxJbXT8ArvgD6LYj5aNC8d/view?usp=drive_link",
      title: "Video 2",
      orientation: "vertical",
    },
    {
      shareUrl: "https://drive.google.com/file/d/1ogUo_0GeLLJmRnZHBl0n2uqc-4vJHIpb/view?usp=drive_link",
      title: "Video 3",
      orientation: "vertical",
    },
    {
      shareUrl: "https://drive.google.com/file/d/1fCL-K67HSYvOT6v5Bu0Hw4Ay5m1VBaTr/view?usp=drive_link",
      title: "Video 4",
      orientation: "vertical",
    },
    {
      shareUrl: "https://drive.google.com/file/d/1Qty7uiatqJ28W6IueRpU_7aO1KTt77QH/view?usp=drive_link",
      title: "Video 5",
      orientation: "vertical",
    },
    {
      shareUrl: "https://drive.google.com/file/d/14nJvmfwZi6YoKDt9CPgF-seZDAieZJLA/view?usp=drive_link",
      title: "Video 6",
      orientation: "horizontal",
    },
  ]

  const currentVideo = videos[currentVideoIndex]
  const isVertical = currentVideo.orientation === "vertical"
  const embedUrl = convertGoogleDriveUrl(currentVideo.shareUrl)

  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://r1.ilikewallpaper.net/iphone-wallpapers/download/17613/Dark-patterned-background-iphone-wallpaper-ilikewallpaper_com_640.jpg')",
          filter: "brightness(200%)",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-6 md:py-8">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{
              fontFamily: "Times New Roman, serif",
              WebkitTextStroke: "1.0px gold",
              textStroke: "1.0px gold",
            }}
          >
            Adarsh Work Portfolio
          </h1>

          {/* Bio Paragraph */}
          <div className="max-w-4xl mx-auto px-4">
            <p
              className="text-sm md:text-base text-gray-300 leading-relaxed"
              style={{
                fontFamily: "Times New Roman, serif",
              }}
            >
              Hey, I'm Adarsh — a video editor with solid experience across a wide range of mainstream editing styles
              and niches, including talking head videos, cinematic edits, short-form and long-form content. To date,
              I've edited over 350+ videos, helping generate more than 400K followers and over a million views across
              various platforms.
            </p>
          </div>
        </header>

        {/* Video Counter - Above Video */}
        <div className="flex justify-center py-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span
              className="text-sm font-medium"
              style={{
                fontFamily: "Times New Roman, serif",
                WebkitTextStroke: "1.0px gold",
                textStroke: "1.0px gold",
              }}
            >
              {currentVideoIndex + 1} / {videos.length}
            </span>
          </div>
        </div>

        {/* Main Video Display with Side Navigation */}
        <main className="relative flex items-center justify-center px-4 py-8">
          {/* Left Navigation Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-5 transition-all duration-200 transform hover:scale-110 shadow-lg"
            aria-label="Previous video"
            style={{ transform: "translateY(-50%)", top: "50%" }}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Video Player Container - Simple Google Drive Player */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <iframe
                ref={videoRef}
                key={currentVideoIndex}
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="border-0"
                style={
                  isVertical
                    ? {
                        width: "350px",
                        height: "620px",
                      }
                    : {
                        width: "800px",
                        height: "450px",
                      }
                }
                loading="lazy"
                title={currentVideo.title}
              />
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-5 transition-all duration-200 transform hover:scale-110 shadow-lg"
            aria-label="Next video"
            style={{ transform: "translateY(-50%)", top: "50%" }}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </main>

        {/* Navigation Dots - Below Video */}
        <div className="flex justify-center gap-3 py-6">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentVideoIndex
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-400/50"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Contact Section */}
        <section className="bg-gray-900/80 backdrop-blur-sm py-16 px-4 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{
                fontFamily: "Times New Roman, serif",
                WebkitTextStroke: "1.0px gold",
                textStroke: "1.0px gold",
              }}
            >
              Contact Me
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:musicmine199@gmail.com"
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 transition-all duration-200 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span
                  className="text-lg"
                  style={{
                    fontFamily: "Times New Roman, serif",
                  }}
                >
                  musicmine199@gmail.com
                </span>
              </a>
              <a
                href="mailto:officialadarsh9644@gmail.com"
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 transition-all duration-200 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span
                  className="text-lg"
                  style={{
                    fontFamily: "Times New Roman, serif",
                  }}
                >
                  officialadarsh9644@gmail.com
                </span>
              </a>
              <a
                href="https://discord.gg/Am6kbsJuzm"
                className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 transition-all duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span
                  className="text-lg"
                  style={{
                    fontFamily: "Times New Roman, serif",
                  }}
                >
                  adarsh9644
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-6 text-center text-gray-400">
          <p
            style={{
              fontFamily: "Times New Roman, serif",
              WebkitTextStroke: "1.0px gold",
              textStroke: "1.0px gold",
            }}
          >
            &copy; 2025 Adarsh Work Portfolio. All rights reserved.
          </p>
        </footer>

        {/* Additional Portfolio Button - At Very Bottom */}
        <div className="bg-black py-8 text-center">
          <a
            href="https://drive.google.com/drive/folders/1oIRPF0UPX7OkcHsKRxGDidfQ1I12VZrw?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{
              fontFamily: "Times New Roman, serif",
            }}
          >
            <ExternalLink className="w-4 h-4" />
            Additional Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
