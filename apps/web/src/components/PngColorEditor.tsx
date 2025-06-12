"use client";

import {
  colorMatch,
  downloadCanvasAsImage,
  hexToRgb,
  rgbToHex,
} from "@/lib/canvasUtils";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Palette, Download, Eye } from "lucide-react";
import { toast } from "sonner";
// import Image as Img from "next/image";
import Logo from "../../public/assets/Logo.png";

export default function PngColorEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [replaceColor, setReplaceColor] = useState<string>("#ff0000");
  const [recoloredImage, setRecoloredImage] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(
    null
  );
  const [tolerance, setTolerance] = useState<number>(60);

  const [imageToDraw, setImageToDraw] = useState<HTMLImageElement | null>(null);

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
    console.log(file);
    if (!file) return;

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
    console.log("replace");
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
          tolerance
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

    setSelectedColor(replaceColor);
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
    downloadCanvasAsImage(canvasRef.current, "recolored-image.png");
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 ">
              {/* // eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-20 aspect-square"
                src="/assets/Logo.png"
                alt="alt-logo"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-[#FC2D35] bg-clip-text text-transparent mb-4">
            Recolorly
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Effortlessly modify colors in your PNG images with Recolorly —
            select, adjust, and replace any color to customize graphics, icons,
            or assets with pixel-level precision.
          </p>
        </div>

        {/* Main Editor */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </CardTitle>
                  <CardDescription>
                    Select a PNG or any image file to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-12  cursor-pointer"
                      variant="outline"
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
                </CardContent>
              </Card>

              {imageLoaded && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Color Selection
                    </CardTitle>
                    <CardDescription>
                      Click on the image to select a color to replace
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="selected-color">Selected Color</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-8 h-8 rounded border-2 border-border"
                            style={{ backgroundColor: selectedColor }}
                          />
                          <Input
                            id="selected-color"
                            type="text"
                            value={selectedColor}
                            readOnly
                            className="font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="replace-color">Replace With</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            value={replaceColor}
                            onChange={(e) => setReplaceColor(e.target.value)}
                            className="w-8 h-8 rounded border-2 border-border cursor-pointer"
                          />
                          <Input
                            id="replace-color"
                            type="text"
                            value={replaceColor}
                            onChange={(e) => setReplaceColor(e.target.value)}
                            className="font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="tolerance-slider">Tolerance</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            id="tolerance-slider"
                            type="range"
                            min={0}
                            max={100}
                            value={tolerance}
                            onChange={(e) =>
                              setTolerance(Number(e.target.value))
                            }
                            className="w-full"
                          />
                          <span className="w-10 text-center font-mono">
                            {tolerance}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={replaceColorInCanvas}
                          disabled={!imageLoaded}
                          className="w-full"
                        >
                          <Palette className="w-4 h-4 mr-2" />
                          Replace
                        </Button>
                        <Button
                          onClick={resetImage}
                          variant="outline"
                          disabled={!imageLoaded}
                          className="w-full"
                        >
                          Reset
                        </Button>
                      </div>

                      {recoloredImage && (
                        <Button
                          onClick={handleDownload}
                          className="w-full"
                          variant="default"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Image
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    {imageLoaded
                      ? "Click on any color in the image to select it for replacement"
                      : "Upload an image to see the preview here"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center min-h-[400px]">
                  {/* {imageLoaded ? ( */}
                  <div className="max-w-full max-h-[600px] overflow-auto border rounded-lg">
                    <canvas
                      ref={canvasRef}
                      className={`max-w-full h-auto cursor-crosshair ${imageLoaded ? "block" : "hidden"} `}
                      //   style={{ display: "block" }}
                    />
                  </div>
                  {!imageLoaded && (
                    <div className="text-center text-muted-foreground">
                      <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No image loaded</p>
                      <p className="text-sm">Upload an image to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
              <p className="text-muted-foreground">
                Simply drag and drop or click to upload any image format
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precise Selection</h3>
              <p className="text-muted-foreground">
                Click on any pixel to select its exact color for replacement
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-muted-foreground">
                Download your edited image instantly in high quality PNG format
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
