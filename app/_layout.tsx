import { ThemeProvider } from './context/ThemeContext';
import { HeaderWithTheme } from './components/HeaderWithTheme';

export default function Layout() {
    return (
        <ThemeProvider>
            <HeaderWithTheme />
        </ThemeProvider>
    );
}
