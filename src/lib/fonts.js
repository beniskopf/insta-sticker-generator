// Fonts are bundled locally (see src/assets/fonts). Vite turns each .ttf import
// into an asset URL string, which we fetch at runtime and parse with opentype.js.
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import Bebas from '../assets/fonts/BebasNeue-Regular.ttf';
import Pacifico from '../assets/fonts/Pacifico-Regular.ttf';
import Caveat from '../assets/fonts/Caveat-Regular.ttf';
import Montserrat from '../assets/fonts/Montserrat-Regular.ttf';

export const FONTS = [
  { id: 'poppins', label: 'Poppins', url: Poppins },
  { id: 'montserrat', label: 'Montserrat', url: Montserrat },
  { id: 'bebas', label: 'Bebas Neue', url: Bebas },
  { id: 'pacifico', label: 'Pacifico (Script)', url: Pacifico },
  { id: 'caveat', label: 'Caveat (Handschrift)', url: Caveat },
];
