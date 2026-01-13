/**
 * @fileoverview Extensão de tipos do styled-components
 */

import 'styled-components';
import type { Theme } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
