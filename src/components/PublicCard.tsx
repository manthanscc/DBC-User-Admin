import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Youtube,
  Camera,
  MessageCircle,
  MapPin,
  Star,
  ExternalLink,
  Play,
  FileText,
  Eye,
  Image as ImageIcon,
  Download,
  Share2,
  QrCode,
  User,
  Building,
  Briefcase,
  Heart
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type BusinessCard = Database['public']['Tables']['business_cards']['Row'];
type SocialLink = Database['public']['Tables']['social_links']['Row'];

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
}

interface ProductService {
  id: string;
  title: string;
  description: string;
  price?: string;
  category?: string;
  text_alignment: 'left' | 'center' | 'right';
  is_featured: boolean;
  is_active: boolean;
  images: Array<{
    id: string;
    image_url: string;
    alt_text?: string;
    display_order: number;
    is_active: boolean;
  }>;
  inquiries: Array<{
    id: string;
    inquiry_type: 'link' | 'phone' | 'whatsapp' | 'email';
    contact_value: string;
    button_text: string;
    is_active: boolean;
  }>;
}

interface ReviewLink {
  id: string;
  title: string;
  review_url: string;
  created_at: string;
}

const SOCIAL_ICONS: Record<string, React.ComponentType<any>> = {
  Instagram,
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter,
  Facebook,
  'You Tube': Youtube,
  YouTube: Youtube,
  Website: Globe,
  WhatsApp: MessageCircle,
  Telegram: MessageCircle,
  'Custom Link': ExternalLink,
};

export const PublicCard: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [products, setProducts] = useState<ProductService[]>([]);
  const [reviewLinks, setReviewLinks] = useState<ReviewLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (cardId) {
      loadCard();
    }
  }, [cardId]);

  // Update meta tags when card data is loaded
  useEffect(() => {
    if (card) {
      updateMetaTags();
      trackView();
    }
  }, [card]);

  const updateMetaTags = () => {
    if (!card) return;

    const cardData = {
      name: card.title || 'Digital Business Card',
      company: card.company || '',
      profession: card.position || '',
      bio: card.bio || '',
      avatar: card.avatar_url || 'https://github.com/yash131120/DBC_____logo/blob/main/logo.png?raw=true'
    };

    // Call the global function defined in index.html
    if (typeof window !== 'undefined' && (window as any).updateCardMetaTags) {
      (window as any).updateCardMetaTags(cardData);
    }
  };

  const loadCard = async () => {
    if (!cardId) return;

    try {
      setLoading(true);
      setError(null);

      // Load card data
      const { data: cardData, error: cardError } = await supabase
        .from('business_cards')
        .select('*')
        .eq('slug', cardId)
        .eq('is_published', true)
        .single();

      if (cardError) {
        if (cardError.code === 'PGRST116') {
          setError('Card not found or not published');
        } else {
          setError('Failed to load card');
        }
        return;
      }

      setCard(cardData);

      // Load social links
      const { data: socialData } = await supabase
        .from('social_links')
        .select('*')
        .eq('card_id', cardData.id)
        .eq('is_active', true)
        .order('display_order');

      setSocialLinks(socialData || []);

      // Load media items
      const { data: mediaData } = await supabase
        .from('media_items')
        .select('*')
        .eq('card_id', cardData.id)
        .eq('is_active', true)
        .order('display_order');

      const formattedMedia: MediaItem[] = (mediaData || []).map(item => ({
        id: item.id,
        type: item.type as 'image' | 'video' | 'document',
        url: item.url,
        title: item.title,
        description: item.description || undefined,
        thumbnail_url: item.thumbnail_url || undefined
      }));

      setMediaItems(formattedMedia);

      // Load products/services
      const { data: productsData } = await supabase
        .from('products_services')
        .select('*')
        .eq('card_id', cardData.id)
        .eq('is_active', true)
        .order('display_order');

      if (productsData) {
        const productsWithDetails = await Promise.all(
          productsData.map(async (product) => {
            // Load image links
            const { data: imagesData } = await supabase
              .from('product_image_links')
              .select('*')
              .eq('product_id', product.id)
              .eq('is_active', true)
              .order('display_order');

            // Load inquiries
            const { data: inquiriesData } = await supabase
              .from('product_inquiries')
              .select('*')
              .eq('product_id', product.id)
              .eq('is_active', true);

            return {
              ...product,
              images: imagesData || [],
              inquiries: inquiriesData || []
            };
          })
        );

        setProducts(productsWithDetails);
      }

      // Load review links
      const { data: reviewsData } = await supabase
        .from('review_links')
        .select('*')
        .eq('card_id', cardData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      const formattedReviews: ReviewLink[] = (reviewsData || []).map(item => ({
        id: item.id,
        title: item.title,
        review_url: item.review_url,
        created_at: item.created_at
      }));

      setReviewLinks(formattedReviews);

    } catch (error) {
      console.error('Error loading card:', error);
      setError('Failed to load card');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    if (!card) return;

    try {
      // Track view in analytics
      await supabase.from('card_analytics').insert({
        card_id: card.id,
        visitor_ip: null, // Would be populated server-side in production
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });

      // Increment view count
      await supabase
        .from('business_cards')
        .update({ view_count: (card.view_count || 0) + 1 })
        .eq('id', card.id);

    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getCardShapeClasses = () => {
    switch (card?.shape) {
      case 'rounded':
        return 'rounded-3xl';
      case 'circle':
        return 'rounded-full aspect-square';
      case 'hexagon':
        return 'rounded-3xl';
      default:
        return 'rounded-2xl';
    }
  };

  const getLayoutClasses = () => {
    const layout = card?.layout as any;
    const baseClasses = 'flex flex-col';
    
    switch (layout?.alignment) {
      case 'left':
        return `${baseClasses} items-start text-left`;
      case 'right':
        return `${baseClasses} items-end text-right`;
      default:
        return `${baseClasses} items-center text-center`;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderFormattedText = (text: string, alignment: string = 'left') => {
    const alignmentClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';
    
    return (
      <div className={`${alignmentClass} whitespace-pre-wrap leading-relaxed`}>
        {text.split('\n').map((line, index) => {
          // Handle bullet points
          if (line.trim().startsWith('• ')) {
            return (
              <div key={index} className="flex items-start gap-2 mb-1">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: line.replace('• ', '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
                }} />
              </div>
            );
          }
          
          // Handle regular lines
          return (
            <div key={index} className={line.trim() === '' ? 'mb-2' : 'mb-1'}>
              <span dangerouslySetInnerHTML={{ 
                __html: line
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
              }} />
            </div>
          );
        })}
      </div>
    );
  };

  const downloadCard = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      const cardElement = document.getElementById('business-card');
      if (!cardElement) return;

      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `${card?.slug || 'business-card'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Failed to download card. Please try again.');
    }
  };

  const shareCard = async () => {
    const url = window.location.href;
    const title = `${card?.title || 'Digital Business Card'} - ${card?.company || 'Professional'}`;
    const text = `Check out ${card?.title || 'this professional'}'s digital business card!`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Card URL copied to clipboard!');
      } catch (error) {
        alert('Failed to copy URL. Please copy it manually from the address bar.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business card...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Card Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The business card you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  const theme = card.theme as any || {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    background: '#FFFFFF',
    text: '#1F2937'
  };

  const layout = card.layout as any || {
    style: 'modern',
    alignment: 'center',
    font: 'Inter'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header with Actions */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://github.com/yash131120/DBC_____logo/blob/main/dbclogo.png?raw=true"
                alt="Digital Business Card Logo"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Digital Business Card</h1>
                <p className="text-sm text-gray-600">by SCC Infotech LLP</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </button>
              <button
                onClick={shareCard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={downloadCard}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share QR Code</h3>
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Scan this QR code to view this business card
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div
              id="business-card"
              className={`p-8 ${getCardShapeClasses()} shadow-2xl border border-gray-100 ${getLayoutClasses()}`}
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                fontFamily: `'${layout.font}', sans-serif`,
              }}
            >
              {/* Avatar */}
              <div className="mb-6">
                {card.avatar_url ? (
                  <img
                    src={card.avatar_url}
                    alt={card.title || 'Profile'}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 shadow-lg"
                    style={{ borderColor: theme.primary }}
                  />
                ) : (
                  <div
                    className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white font-bold text-3xl border-4 shadow-lg"
                    style={{
                      backgroundColor: theme.primary,
                      borderColor: theme.secondary,
                    }}
                  >
                    {card.title ? (
                      card.title.charAt(0).toUpperCase()
                    ) : (
                      <Camera className="w-12 h-12" />
                    )}
                  </div>
                )}
              </div>

              {/* Name and Bio */}
              <div className="mb-6">
                <h2
                  className="text-3xl font-bold mb-3"
                  style={{ color: theme.text }}
                >
                  {card.title || 'Professional'}
                </h2>
                
                {card.position && (
                  <div className="flex items-center gap-2 mb-2 justify-center">
                    <Briefcase className="w-5 h-5" style={{ color: theme.primary }} />
                    <p
                      className="text-lg font-medium"
                      style={{ color: theme.secondary }}
                    >
                      {card.position}
                    </p>
                  </div>
                )}
                
                {card.company && (
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <Building className="w-5 h-5" style={{ color: theme.primary }} />
                    <p
                      className="text-base opacity-90"
                      style={{ color: theme.text }}
                    >
                      {card.company}
                    </p>
                  </div>
                )}
                
                {card.bio && (
                  <p
                    className="text-sm opacity-80 leading-relaxed"
                    style={{ color: theme.text }}
                  >
                    {card.bio}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-black hover:bg-opacity-5 hover:scale-105"
                  >
                    <Mail
                      className="w-5 h-5"
                      style={{ color: theme.primary }}
                    />
                    <span className="text-sm font-medium">{card.email}</span>
                  </a>
                )}
                
                {card.phone && (
                  <a
                    href={`tel:${card.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-black hover:bg-opacity-5 hover:scale-105"
                  >
                    <Phone
                      className="w-5 h-5"
                      style={{ color: theme.primary }}
                    />
                    <span className="text-sm font-medium">{card.phone}</span>
                  </a>
                )}
                
                {card.whatsapp && (
                  <a
                    href={`https://wa.me/${card.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-black hover:bg-opacity-5 hover:scale-105"
                  >
                    <MessageCircle
                      className="w-5 h-5"
                      style={{ color: theme.primary }}
                    />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                )}
                
                {card.website && (
                  <a
                    href={card.website.startsWith('http') ? card.website : `https://${card.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-black hover:bg-opacity-5 hover:scale-105"
                  >
                    <Globe
                      className="w-5 h-5"
                      style={{ color: theme.primary }}
                    />
                    <span className="text-sm font-medium">{card.website}</span>
                  </a>
                )}
                
                {card.address && (
                  <div className="flex items-start gap-3 p-3 rounded-lg">
                    <MapPin
                      className="w-5 h-5 mt-0.5"
                      style={{ color: theme.primary }}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium block">{card.address}</span>
                      {card.map_link && (
                        <a
                          href={card.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1 inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View on Map
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3 flex-wrap justify-center">
                  {socialLinks.map((link) => {
                    const Icon = SOCIAL_ICONS[link.platform] || Globe;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                        style={{
                          backgroundColor: theme.primary,
                        }}
                        title={`${link.platform}${link.username ? ` - @${link.username}` : ''}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* View Count */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{card.view_count || 0} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Products/Services */}
            {products.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Products & Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.filter(p => p.is_active).map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      {/* Product Images */}
                      {product.images && product.images.length > 0 && (
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-2">
                            {product.images.slice(0, 4).map((image, index) => (
                              <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={image.image_url}
                                  alt={image.alt_text || `${product.title} image ${index + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          {product.images.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              +{product.images.length - 4} more images
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h4>
                          {product.price && (
                            <p className="text-lg text-green-600 font-semibold mb-2">{product.price}</p>
                          )}
                          {product.category && (
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                              {product.category}
                            </span>
                          )}
                        </div>
                        {product.is_featured && (
                          <Star className="w-6 h-6 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <div className="mb-4">
                        {renderFormattedText(product.description, product.text_alignment)}
                      </div>
                      
                      {product.inquiries.filter(i => i.is_active).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {product.inquiries.filter(i => i.is_active).map((inquiry, index) => (
                            <a
                              key={index}
                              href={
                                inquiry.inquiry_type === 'phone' ? `tel:${inquiry.contact_value}` :
                                inquiry.inquiry_type === 'whatsapp' ? `https://wa.me/${inquiry.contact_value.replace(/[^0-9]/g, '')}` :
                                inquiry.inquiry_type === 'email' ? `mailto:${inquiry.contact_value}` :
                                inquiry.contact_value
                              }
                              target={inquiry.inquiry_type === 'link' ? '_blank' : undefined}
                              rel={inquiry.inquiry_type === 'link' ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {inquiry.inquiry_type === 'link' && <ExternalLink className="w-4 h-4" />}
                              {inquiry.inquiry_type === 'phone' && <Phone className="w-4 h-4" />}
                              {inquiry.inquiry_type === 'whatsapp' && <MessageCircle className="w-4 h-4" />}
                              {inquiry.inquiry_type === 'email' && <Mail className="w-4 h-4" />}
                              {inquiry.button_text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery */}
            {mediaItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-purple-600" />
                  Media Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaItems.map((item) => (
                    <div key={item.id} className="relative group">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ) : item.type === 'video' ? (
                        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-600" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Links */}
            {reviewLinks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-600" />
                  Customer Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewLinks.map((review) => (
                    <a
                      key={review.id}
                      href={review.review_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">
                          {review.title}
                        </h4>
                        <p className="text-sm text-gray-600">View our reviews</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-center text-white">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-200" />
              <h3 className="text-xl font-bold mb-2">Get Connected</h3>
              <p className="text-blue-100 mb-4">
                Save my contact information and stay in touch!
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={shareCard}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <Share2 className="w-5 h-5" />
                  Share Card
                </button>
                <button
                  onClick={downloadCard}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Save Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="https://github.com/yash131120/DBC_____logo/blob/main/logo.png?raw=true"
              alt="SCC Infotech LLP Logo"
              className="w-8 h-8"
            />
            <span className="text-lg font-bold text-gray-900">SCC Infotech LLP</span>
          </div>
          <p className="text-gray-600 mb-4">
            Create your own digital business card with our AI-powered platform
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
          >
            <Globe className="w-5 h-5" />
            Create Your Card
          </a>
        </div>
      </footer>
    </div>
  );
};