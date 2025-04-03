
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const SignLanguageTranslator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sample sign language phrases for demo
  const demoSignPhrases = [
    "Hello, how are you?",
    "Nice to meet you",
    "Thank you",
    "I need help",
    "Good morning",
    "My name is...",
  ];

  useEffect(() => {
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const toggleCamera = async () => {
    if (!cameraEnabled) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraEnabled(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Cannot access camera. Please check permissions.");
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setCameraEnabled(false);
      }
    }
  };

  const startTranslation = () => {
    setIsRecording(true);
    
    // Simulate translation with random phrase selection after 2 seconds
    setTimeout(() => {
      const randomPhrase = demoSignPhrases[Math.floor(Math.random() * demoSignPhrases.length)];
      setTranslatedText(randomPhrase);
      setIsRecording(false);
    }, 2000);
  };

  const speakText = () => {
    if (!translatedText) return;
    
    setIsSpeaking(true);
    
    // Using Web Speech API for simple demo purposes
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  const clearTranslation = () => {
    setTranslatedText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-heading text-center">Sign Language Translator</h1>
      
      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="camera">Live Camera</TabsTrigger>
          <TabsTrigger value="upload">Upload Video</TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera" className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                {cameraEnabled ? (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500 flex flex-col items-center justify-center h-full">
                    <Video className="w-12 h-12 mb-4" />
                    <p>Camera is disabled</p>
                  </div>
                )}
                
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center bg-red-500 text-white py-1 px-3 rounded-full text-sm">
                    <span className="inline-block w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></span>
                    Recording
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={toggleCamera}
              variant={cameraEnabled ? "outline" : "default"}
              className={cameraEnabled ? "border-red-500 text-red-500" : ""}
            >
              {cameraEnabled ? (
                <>
                  <VideoOff className="w-4 h-4 mr-2" />
                  Disable Camera
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Enable Camera
                </>
              )}
            </Button>
            
            <Button 
              onClick={startTranslation}
              disabled={!cameraEnabled || isRecording}
              className="bg-ocean-blue hover:bg-blue-600"
            >
              Start Translation
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Video className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop a video file</p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                  <Button variant="outline">Select Video</Button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Supported formats: MP4, MOV, AVI (max 100MB)</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Translation Results */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Translation Results</h2>
          <div className="bg-gray-50 p-4 rounded-md min-h-20 mb-4">
            {translatedText ? (
              <p className="text-gray-800">{translatedText}</p>
            ) : (
              <p className="text-gray-400 italic">Translation will appear here...</p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={speakText}
              disabled={!translatedText || isSpeaking}
              className="bg-purple hover:bg-purple/90"
            >
              {isSpeaking ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Speaking...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Speak Text
                </>
              )}
            </Button>
            <Button 
              onClick={clearTranslation}
              variant="outline"
              disabled={!translatedText}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignLanguageTranslator;
