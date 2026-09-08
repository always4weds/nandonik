import React, { useState } from 'react';
import { Product, CategoryId } from '../types';
import { NandonikLogo } from './NandonikLogo';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Store,
  X,
  Check,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface AdminConsoleViewProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onOpenStorefront: () => void;
  onOpenWhatsAppConcierge: () => void;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onOpenStorefront,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'fragrance' as CategoryId,
    price: 3500,
    image: '',
    description: '',
    sku: '',
  });

  const handleOpenAddModal = () => {
    const nextSkuNum = String(products.length + 1).padStart(3, '0');
    setFormData({
      name: '',
      category: 'fragrance',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      description: '',
      sku: `NB-CUR-${nextSkuNum}`,
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      description: p.description || '',
      sku: p.sku || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        image: formData.image || editingProduct.image,
        description: formData.description,
        sku: formData.sku || editingProduct.sku,
        lastModified: 'Modified just now',
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        subtitle: 'Artisanal curation',
        department: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
        category: formData.category,
        price: Number(formData.price),
        sku: formData.sku || `NB-CUR-${products.length + 1}`,
        image: formData.image || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
        description: formData.description,
        rating: 5.0,
        reviewCount: 1,
        inStock: true,
        stockCount: 15,
        specifications: {
          volumeOrSize: 'Standard Curation',
          concentrationOrMaterial: 'Artisan Grade',
          longevityOrCare: 'Store in cool dry space',
          provenance: 'Hand-selected Atelier',
        },
        status: 'Active',
        lastModified: 'Added just now',
      };
      onAddProduct(newProd);
    }

    setIsAddModalOpen(false);
  };

  const confirmDelete = (productId: string) => {
    onDeleteProduct(productId);
    setDeletingProductId(null);
  };

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF8FF] text-[#1B1B20]">
      {/* Top Header */}
      <header className="border-b border-[#F4C2CE]/40 bg-white/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenStorefront}
            className="flex items-center gap-3 text-left hover:opacity-90 transition-all cursor-pointer"
            title="Return to Nandonik Bazar Storefront"
          >
            <NandonikLogo size="sm" showWordmark={true} />
          </button>
          <span className="hidden sm:inline-block h-4 w-px bg-[#F4C2CE]/60 mx-1" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A3C53]">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenStorefront}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE7EB]/50 border border-[#F4C2CE]/70 text-[#554245] text-xs font-medium transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#9A3C53]" />
            <span>Storefront</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      {/* Main Content: Single clean view */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1
              className="text-2xl sm:text-3xl text-[#1B1B20] font-normal tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Product Management
            </h1>
            <p className="text-xs text-[#877275] font-light mt-1">
              Add new products, remove existing items, or update product descriptions directly.
            </p>
          </div>

          <div className="text-xs text-[#554245] bg-white px-3 py-1.5 rounded-xl border border-[#F4C2CE]/60 self-start sm:self-auto font-medium">
            Total Products: <span className="text-[#9A3C53] font-bold">{products.length}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#F4C2CE]/60 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#877275]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU, or description..."
              className="w-full bg-[#FAF6F0]/40 border border-[#F4C2CE]/50 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#1B1B20] outline-none focus:border-[#9A3C53]"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['all', 'fragrance', 'skincare', 'ceramics', 'jewelry'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition-colors capitalize cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#9A3C53] text-white font-semibold'
                    : 'text-[#554245] hover:bg-[#FCE7EB]/50 bg-white border border-[#F4C2CE]/40'
                }`}
              >
                {cat === 'all' ? `All (${products.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Product List Table */}
        <div className="rounded-2xl bg-white border border-[#F4C2CE]/60 overflow-hidden shadow-xs">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#877275]">
              No products found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6F0] border-b border-[#F4C2CE]/40 text-[#877275] text-[10px] font-bold uppercase tracking-[0.14em]">
                  <tr>
                    <th className="py-3.5 px-4">Product & Image</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4C2CE]/20 text-[#1B1B20]">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF6F0]/40 transition-colors">
                      {/* Product details */}
                      <td className="py-3.5 px-4 align-top w-64">
                        <div className="flex items-start gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#F4C2CE]/40 bg-[#FAF6F0]"
                          />
                          <div>
                            <h5 className="font-semibold text-xs text-[#1B1B20] leading-snug">
                              {item.name}
                            </h5>
                            <span className="inline-block px-2 py-0.5 mt-1 rounded-md bg-[#FCE7EB] text-[#9A3C53] text-[9px] font-medium capitalize">
                              {item.category}
                            </span>
                            <span className="block text-[9px] text-[#877275] font-mono mt-0.5">
                              SKU: {item.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 align-top whitespace-nowrap font-bold text-xs text-[#1B1B20]">
                        ৳ {item.price.toLocaleString()} BDT
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-4 align-top max-w-md">
                        <div className="group relative">
                          <p className="text-[11px] text-[#554245] leading-relaxed line-clamp-3">
                            {item.description || (
                              <span className="italic text-[#877275]">No description added. Click Edit to add one.</span>
                            )}
                          </p>
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#9A3C53] hover:underline font-medium cursor-pointer"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                            <span>Edit description</span>
                          </button>
                        </div>
                      </td>

                      {/* Actions: Edit & Remove */}
                      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#FCE7EB] text-[#554245] hover:text-[#9A3C53] text-[11px] font-medium transition-colors cursor-pointer"
                            title="Edit Product Details & Description"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeletingProductId(item.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-medium transition-colors cursor-pointer"
                            title="Remove Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="p-3 bg-[#FAF6F0]/60 border-t border-[#F4C2CE]/30 text-[11px] text-[#877275] flex items-center justify-between">
            <span>Showing {filtered.length} of {products.length} products</span>
            <span className="flex items-center gap-1 text-[#9A3C53] font-medium">
              <Check className="w-3.5 h-3.5" />
              Changes save instantly
            </span>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl border border-red-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1B1B20]">Remove this Product?</h4>
                <p className="text-[11px] text-[#877275]">This item will be deleted immediately.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDeletingProductId(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#554245] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmDelete(deletingProductId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product & Description Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#F4C2CE]/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F4C2CE]/30">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#9A3C53]" />
                <h3
                  className="text-xl text-[#1B1B20] font-normal"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {editingProduct ? 'Edit Product & Description' : 'Add New Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-[#877275] hover:text-[#1B1B20] hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="block font-semibold text-[#1B1B20] mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Celestial Fig Eau De Parfum"
                  className="w-full p-2.5 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53]"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B1B20] mb-1">
                    Price (৳ BDT) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1B1B20] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as CategoryId })
                    }
                    className="w-full p-2.5 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53]"
                  >
                    <option value="fragrance">Fragrance</option>
                    <option value="skincare">Skincare</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="linen">Linen</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-[#1B1B20] mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53]"
                />
              </div>

              {/* Description - Highlighted & spacious */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-[#1B1B20]">
                    Product Description
                  </label>
                  <span className="text-[10px] text-[#877275]">Shown on product details & modal</span>
                </div>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed sensory description, ingredients, notes, or styling ritual..."
                  className="w-full p-3 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53] leading-relaxed text-xs"
                />
              </div>

              {/* Optional SKU */}
              <div>
                <label className="block font-semibold text-[#1B1B20] mb-1">
                  SKU Code <span className="text-[10px] text-[#877275] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="NB-CUR-001"
                  className="w-full p-2.5 bg-white border border-[#F4C2CE]/70 rounded-xl outline-none focus:border-[#9A3C53]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#F4C2CE]/30">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#554245] hover:bg-[#FCE7EB]/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
