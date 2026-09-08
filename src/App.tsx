import React, { useState, useEffect } from 'react';
import { Product, ActiveScreen, CategoryId } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExploreEssence } from './components/ExploreEssence';
import { FeaturedProducts } from './components/FeaturedProducts';
import { HowToOrderSection } from './components/HowToOrderSection';
import { AllCurationsView } from './components/AllCurationsView';
import { CategoriesView } from './components/CategoriesView';
import { HowToOrderView } from './components/HowToOrderView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { AdminAccessGuard } from './components/AdminAccessGuard';
import { LoginModal } from './components/LoginModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppConciergeDrawer } from './components/WhatsAppConciergeDrawer';
import { Footer } from './components/Footer';
import { initAnalytics, testFirestoreConnection } from './firebase';
import {
  syncProductToFirestore,
  deleteProductFromFirestore,
  subscribeToProducts,
  seedInitialProductsIfEmpty,
} from './services/firestoreService';
import {
  AuthUserProfile,
  getInitialStoredUser,
  subscribeToAuth,
  logoutUser,
  isUserAdmin,
} from './services/authService';

const STORAGE_KEY = 'nandonik_bazar_products_v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeTargetProduct, setConciergeTargetProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEssenceCategory, setSelectedEssenceCategory] = useState<CategoryId>('all');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUserProfile | null>(() => getInitialStoredUser());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Admin Verification: ONLY mehdihimel@yahoo.com is permitted
  const isAdmin = isUserAdmin(currentUser);

  // Initialize Firebase and subscribe to Firestore products & Auth
  useEffect(() => {
    initAnalytics();
    testFirestoreConnection();

    // Real-time Firestore synchronization for products
    const unsubscribeProducts = subscribeToProducts((firestoreProducts) => {
      if (firestoreProducts && firestoreProducts.length > 0) {
        setProducts(firestoreProducts);
      } else {
        // Seed initial products to Firestore if collection is empty
        seedInitialProductsIfEmpty(INITIAL_PRODUCTS);
      }
    });

    // Subscribe to Auth state changes
    const unsubscribeAuth = subscribeToAuth((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeAuth();
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist to storage:', e);
    }
  }, [products]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    if (screen === 'home') {
      setSelectedProduct(null);
      setSearchQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    if (activeScreen === 'admin') {
      setActiveScreen('home');
    }
  };

  const handleOpenWhatsAppForProduct = (product: Product) => {
    setConciergeTargetProduct(product);
    setIsConciergeOpen(true);
  };

  const handleOpenGeneralWhatsApp = () => {
    setConciergeTargetProduct(null);
    setIsConciergeOpen(true);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    syncProductToFirestore(newProd);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    syncProductToFirestore(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
    deleteProductFromFirestore(productId);
  };

  // Find the primary hero product (Aura Nocturne)
  const heroProduct = products.find((p) => p.id === 'aura-nocturne') || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8FF] text-[#1B1B20] selection:bg-[#FCE7EB] selection:text-[#9A3C53]">
      {/* Navigation Header (Hidden on active authorized admin console to give full workstation focus) */}
      {!(activeScreen === 'admin' && isAdmin) && (
        <Navbar
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
          onOpenWhatsAppConcierge={handleOpenGeneralWhatsApp}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (activeScreen === 'home') {
              setActiveScreen('products');
            }
          }}
          currentUser={currentUser}
          isAdmin={isAdmin}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeScreen === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section */}
            <HeroSection
              heroProduct={heroProduct}
              onExploreClick={() => handleNavigate('products')}
              onProductClick={(p) => setSelectedProduct(p)}
              onOrderWhatsApp={handleOpenWhatsAppForProduct}
            />

            {/* Department Curations: Explore by Essence */}
            <ExploreEssence
              selectedCategory={selectedEssenceCategory}
              onSelectCategory={(cat) => {
                setSelectedEssenceCategory(cat);
                handleNavigate('products');
              }}
            />

            {/* Signature Featured Products */}
            <FeaturedProducts
              products={products}
              onProductClick={(p) => setSelectedProduct(p)}
              onOrderWhatsApp={handleOpenWhatsAppForProduct}
            />

            {/* How to Order in 3 Simple Steps & Feature Badges */}
            <HowToOrderSection
              onOpenCatalogue={() => handleNavigate('products')}
              onOpenWhatsAppConcierge={handleOpenGeneralWhatsApp}
            />
          </div>
        )}

        {activeScreen === 'products' && (
          <div className="animate-in fade-in duration-300">
            <AllCurationsView
              products={products}
              onProductClick={(p) => setSelectedProduct(p)}
              onOrderWhatsApp={handleOpenWhatsAppForProduct}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}

        {activeScreen === 'categories' && (
          <div className="animate-in fade-in duration-300">
            <CategoriesView
              onSelectCategory={(cat) => {
                setSelectedEssenceCategory(cat);
                handleNavigate('products');
              }}
            />
          </div>
        )}

        {activeScreen === 'how-to-order' && (
          <div className="animate-in fade-in duration-300">
            <HowToOrderView
              onOpenWhatsAppConcierge={handleOpenGeneralWhatsApp}
              onExploreCatalogue={() => handleNavigate('products')}
            />
          </div>
        )}

        {/* Admin Console or Restricted Guard */}
        {activeScreen === 'admin' && (
          <div className="animate-in fade-in duration-300">
            {isAdmin ? (
              <AdminConsoleView
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onOpenStorefront={() => handleNavigate('home')}
                onOpenWhatsAppConcierge={handleOpenGeneralWhatsApp}
              />
            ) : (
              <AdminAccessGuard
                currentUser={currentUser}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onReturnToStore={() => handleNavigate('home')}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Footer (shown on customer facing screens) */}
      {!(activeScreen === 'admin' && isAdmin) && (
        <Footer
          onNavigate={handleNavigate}
          onOpenWhatsAppConcierge={handleOpenGeneralWhatsApp}
          isAdmin={isAdmin}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOrderWhatsApp={(p) => {
            handleOpenWhatsAppForProduct(p);
          }}
        />
      )}

      {/* WhatsApp Concierge Drawer & Simulation */}
      <WhatsAppConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        targetProduct={conciergeTargetProduct}
      />

      {/* Login & Registration Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
