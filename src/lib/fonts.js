// Fonts are bundled locally (see src/assets/fonts). Vite turns each .ttf import
// into an asset URL string, which we fetch at runtime and parse with opentype.js.
// All chosen weights are bold/thick static instances — no thin defaults.
import Poppins from '../assets/fonts/Poppins-SemiBold.ttf';
import Anton from '../assets/fonts/Anton-Regular.ttf';
import Bebas from '../assets/fonts/BebasNeue-Regular.ttf';
import ArchivoBlack from '../assets/fonts/ArchivoBlack-Regular.ttf';
import Chewy from '../assets/fonts/Chewy-Regular.ttf';
import Righteous from '../assets/fonts/Righteous-Regular.ttf';
import Pacifico from '../assets/fonts/Pacifico-Regular.ttf';
import Lobster from '../assets/fonts/Lobster-Regular.ttf';
import PermanentMarker from '../assets/fonts/PermanentMarker-Regular.ttf';
import Bangers from '../assets/fonts/Bangers-Regular.ttf';

export const FONTS = [
  { id: 'poppins', label: 'Poppins', url: Poppins },
  { id: 'archivo', label: 'Archivo Black', url: ArchivoBlack },
  { id: 'anton', label: 'Anton', url: Anton },
  { id: 'bebas', label: 'Bebas Neue', url: Bebas },
  { id: 'chewy', label: 'Chewy', url: Chewy },
  { id: 'righteous', label: 'Righteous', url: Righteous },
  { id: 'pacifico', label: 'Pacifico', url: Pacifico },
  { id: 'lobster', label: 'Lobster', url: Lobster },
  { id: 'marker', label: 'Permanent Marker', url: PermanentMarker },
  { id: 'bangers', label: 'Bangers', url: Bangers },
];

export const DEFAULT_FONT_ID = 'poppins';

export function isFontId(id) {
  return FONTS.some((f) => f.id === id);
}
