import { SignIn, SignUp, UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  console.log('App component rendered');

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
              <Header />
              <Routes>
                <Route path="/login" element={<SignIn redirectUrl={"/home"} />} />
                <Route path="/register" element={<SignUp redirectUrl={"/home"}/>} />
                <Route path="/profile" element={<div>ProfilePage</div>} />
                <Route path="/logout" element={<UserButton />} />
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={
                  <>
                    <SignedIn>
                      <Home />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                } />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
