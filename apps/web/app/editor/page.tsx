"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Palette, Download, Eye, RotateCcw, Zap } from "lucide-react";
import { toast } from "sonner";

import {
  colorMatch,
  downloadCanvasAsImage,
  hexToRgb,
  rgbToHex,
} from "@/lib/canvasUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PngColorEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [replaceColor, setReplaceColor] = useState<string>("#ffffff");
  const [recoloredImage, setRecoloredImage] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(
    null
  );
  const [tolerance, setTolerance] = useState<number[]>([60]);
  const [imageToDraw, setImageToDraw] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>("recolored-image.png");

  useEffect(() => {
    if (!canvasRef.current || !imageToDraw) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageToDraw.width;
    canvas.height = imageToDraw.height;
    ctx.drawImage(imageToDraw, 0, 0);

    setOriginalImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    setImageLoaded(true);
    setRecoloredImage(false);
    toast.success("Image loaded successfully!");
  }, [imageToDraw]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        console.log("loaded image");
        setImageToDraw(img);
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.onclick = (e) => {
          const x = e.offsetX;
          const y = e.offsetY;
          console.log("x:", x);
          console.log("y:", y);
          const ctx = canvas.getContext("2d");
          if (ctx === null) return;
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          const [r, g, b] = pixel;
          console.log(r, g, b);
          const hexColor = rgbToHex(Number(r), Number(g), Number(b));
          console.log(hexColor);
          setSelectedColor(hexColor);
          toast.info(`Color selected: ${hexColor}`);
        };
      };
    };
    reader.readAsDataURL(file);
  };

  const replaceColorInCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (originalImageData === null) return;

    const imgData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );

    const targetRGB = hexToRgb(selectedColor);
    const newRGB = hexToRgb(replaceColor);

    console.log("target: ", targetRGB);
    console.log("new: ", newRGB);

    for (let i = 0; i < imgData.data.length; i += 4) {
      const [r, g, b] = [
        imgData.data[i],
        imgData.data[i + 1],
        imgData.data[i + 2],
      ];

      if (
        colorMatch(
          Number(r),
          Number(g),
          Number(b),
          targetRGB.r,
          targetRGB.g,
          targetRGB.b,
          tolerance[0]
        )
      ) {
        imgData.data[i] = newRGB.r;
        imgData.data[i + 1] = newRGB.g;
        imgData.data[i + 2] = newRGB.b;
      }
    }

    console.log("imageData: ", imgData);

    ctx.putImageData(imgData, 0, 0);

    setRecoloredImage(true);
  };

  const resetImage = () => {
    if (!originalImageData || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.putImageData(originalImageData, 0, 0);
    setRecoloredImage(false);
    toast.info("Image reset to original");
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    downloadCanvasAsImage(canvasRef.current, `recolorly_${imageName}`);
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white grid-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FC2D35]/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FC2D35] to-red-400 bg-clip-text text-transparent">
                Color Editor
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your images with precision color replacement. Click any
              pixel to select its color, choose a replacement, and watch your
              image transform instantly.
            </p>
          </div>

          {/* Main Editor */}
          <div className="max-w-7xl mx-auto">
            <div className="grid xl:grid-cols-4 gap-8">
              {/* Controls Panel */}
              <div className="xl:col-span-1 space-y-6">
                {/* Color Controls */}
                {imageLoaded && (
                  <Card className="bg-gray-900/50 border-gray-700 hover:border-[#FC2D35]/30 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Palette className="w-5 h-5 text-[#FC2D35]" />
                        Color Controls
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Click on the image to select colors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Selected Color */}
                      <div>
                        <Label
                          htmlFor="selected-color"
                          className="text-gray-300 font-medium"
                        >
                          Selected Color
                        </Label>
                        <div className="flex items-center gap-3 mt-2">
                          <div
                            className="w-10 h-10 rounded-lg border-2 border-gray-600 shadow-inner"
                            style={{ backgroundColor: selectedColor }}
                          />
                          <Input
                            id="selected-color"
                            type="text"
                            value={selectedColor}
                            readOnly
                            className="font-mono bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      {/* Replace Color */}
                      <div>
                        <Label
                          htmlFor="replace-color"
                          className="text-gray-300 font-medium"
                        >
                          Replace With
                        </Label>
                        <div className="flex items-center gap-3 mt-2">
                          <input
                            type="color"
                            value={replaceColor}
                            onChange={(e) => setReplaceColor(e.target.value)}
                            className="w-10 h-10 rounded-lg border-2 border-gray-600 cursor-pointer bg-transparent"
                          />
                          <Input
                            id="replace-color"
                            type="text"
                            value={replaceColor}
                            onChange={(e) => setReplaceColor(e.target.value)}
                            className="font-mono bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      {/* Tolerance Slider */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label
                            htmlFor="tolerance-slider"
                            className="text-gray-300 font-medium"
                          >
                            Tolerance
                          </Label>
                          <span className="text-[#FC2D35] font-mono font-bold">
                            {tolerance[0]}
                          </span>
                        </div>

                        <Slider
                          defaultValue={tolerance}
                          max={100}
                          step={1}
                          onValueChange={(value) => setTolerance(value)}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Precise</span>
                          <span>Flexible</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                          onClick={replaceColorInCanvas}
                          disabled={!imageLoaded}
                          className="bg-[#FC2D35] hover:bg-red-600 text-white border-0"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Replace
                        </Button>
                        <Button
                          onClick={resetImage}
                          variant="outline"
                          disabled={!imageLoaded}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>

                      {/* Download Button */}
                      {recoloredImage && (
                        <Button
                          onClick={handleDownload}
                          className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
                          size="lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Image
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Quick Tips */}
                <Card className="bg-gray-900/30 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Eye className="w-4 h-4 text-[#FC2D35]" />
                      Quick Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400 space-y-2">
                    <p>• Click any pixel to select its color</p>
                    <p>• Use tolerance to match similar colors</p>
                    <p>• Higher tolerance = more colors replaced</p>
                    <p>• Reset anytime to start over</p>
                  </CardContent>
                </Card>
              </div>

              {/* Canvas Area */}
              <div className="xl:col-span-3">
                <Card className="bg-gray-900/50 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-white">Preview</CardTitle>
                    <CardDescription className="text-gray-400">
                      {imageLoaded
                        ? "Click on any color in the image to select it for replacement"
                        : "Upload an image to see the preview here"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center min-h-[500px]">
                    <div
                      className={`${!imageLoaded ? "hidden" : "block"} max-w-full max-h-[700px] overflow-auto border border-gray-600 rounded-lg bg-gray-800/30`}
                    >
                      <canvas
                        ref={canvasRef}
                        className="max-w-full h-auto cursor-crosshair"
                      />
                    </div>
                    {!imageLoaded && (
                      <div className="text-center text-gray-400">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Upload className="w-12 h-12 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-300">
                          No image loaded
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Upload an image to start editing colors
                        </p>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-[#FC2D35] hover:bg-red-600 text-white cursor-pointer"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    )}
                    {/* )} */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
