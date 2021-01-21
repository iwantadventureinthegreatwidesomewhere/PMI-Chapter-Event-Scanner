import { PixelRatio } from "react-native";

export default function normalizeFont(size) {
  const newSize = size / PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
