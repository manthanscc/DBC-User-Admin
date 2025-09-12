import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Download,
  Share2,
  Copy,
  QrCode,
  ArrowLeft,
  Building2,
  User,
  Briefcase,
  Heart,
  ChevronLeft,
  ChevronRight
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

interface Review {
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
  const navigate = useNavigate();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [products, setProducts] = useState<ProductService[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (cardId) {
      loadCard();
    }
  }, [cardId]);

  // Update meta tags when card data is loaded
  useEffect(() => {
    if (card && window.updateCardMetaTags) {
      window.updateCardMetaTags({
        name: card.title || 'Digital Business Card',
        company: card.company || '',
        profession: card.position || '',
        bio: card.bio || `Connect with ${card.title || 'this professional'}`,
        avatar: card.avatar_url || 'https://github.com/yash131120/DBC_____logo/blob/main/logo.png?raw=true'
      });
    }
  }, [card]);

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

      // Track view
      await trackCardView(cardData.id);

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

      setMediaItems(mediaData || []);

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

      // Load reviews
      const { data: reviewsData } = await supabase
        .from('review_links')
        .select('*')
        .eq('card_id', cardData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      setReviews(reviewsData || []);

    } catch (error) {
      console.error('Error loading card:', error);
      setError('Failed to load card');
    } finally {
      setLoading(false);
    }
  };

  const trackCardView = async (cardId: string) => {
    try {
      // Track in card_views table
      await supabase.from('card_views').insert({
        card_id: cardId,
        visitor_ip: null, // Would be populated server-side in production
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });

      // Increment view count
      await supabase
        .from('business_cards')
        .update({ view_count: (card?.view_count || 0) + 1 })
        .eq('id', cardId);

    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const shareCard = async () => {
    const url = window.location.href;
    const title = `${card?.title || 'Digital Business Card'} - ${card?.company || 'Professional'}`;
    const text = `Check out ${card?.title || 'this professional'}'s digital business card`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const downloadCard = async () => {
    const cardElement = document.getElementById('business-card');
    if (!cardElement) return;

    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `${card?.slug || 'business-card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Failed to download card. Please try again.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading business card...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Card Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'The business card you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const cardUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header with Actions */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">QR Code</span>
              </button>
              <button
                onClick={shareCard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={downloadCard}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code</h3>
            <div className="bg-gray-50 p-6 rounded-xl mb-4">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Scan this QR code to share this business card
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(cardUrl)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
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
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center sticky top-24"
              style={{
                backgroundColor: card.theme?.background || '#FFFFFF',
                color: card.theme?.text || '#1F2937',
                fontFamily: `'${card.layout?.font || 'Inter'}', sans-serif`,
              }}
            >
              {/* Avatar */}
              <div className="mb-6">
                {card.avatar_url ? (
                  <img
                    src={card.avatar_url}
                    alt={card.title || 'Profile'}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 shadow-lg"
                    style={{ borderColor: card.theme?.primary || '#3B82F6' }}
                  />
                ) : (
                  <div
                    className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-white font-bold text-4xl border-4 shadow-lg"
                    style={{
                      backgroundColor: card.theme?.primary || '#3B82F6',
                      borderColor: card.theme?.secondary || '#1E40AF',
                    }}
                  >
                    {card.title ? (
                      card.title.charAt(0).toUpperCase()
                    ) : (
                      <Camera className="w-16 h-16" />
                    )}
                  </div>
                )}
              </div>

              {/* Name and Title */}
              <div className="mb-6">
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: card.theme?.text || '#1F2937' }}
                >
                  {card.title || 'Professional'}
                </h1>
                {card.position && (
                  <p
                    className="text-lg font-medium mb-2"
                    style={{ color: card.theme?.secondary || '#1E40AF' }}
                  >
                    {card.position}
                  </p>
                )}
                {card.company && (
                  <p
                    className="text-base opacity-80 mb-3"
                    style={{ color: card.theme?.text || '#1F2937' }}
                  >
                    <Building2 className="w-4 h-4 inline mr-2" />
                    {card.company}
                  </p>
                )}
                {card.bio && (
                  <p
                    className="text-sm opacity-70 leading-relaxed"
                    style={{ color: card.theme?.text || '#1F2937' }}
                  >
                    {card.bio}
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-black hover:bg-opacity-5 hover:scale-105"
                  >
                    <Mail
                      className="w-5 h-5"
                      style={{ color: card.theme?.primary || '#3B82F6' }}
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
                      style={{ color: card.theme?.primary || '#3B82F6' }}
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
                      style={{ color: card.theme?.primary || '#3B82F6' }}
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
                      style={{ color: card.theme?.primary || '#3B82F6' }}
                    />
                    <span className="text-sm font-medium">{card.website}</span>
                  </a>
                )}
                {card.address && (
                  <div className="flex items-start gap-3 p-3 rounded-lg">
                    <MapPin
                      className="w-5 h-5 mt-0.5"
                      style={{ color: card.theme?.primary || '#3B82F6' }}
                    />
                    <div className="text-left">
                      <span className="text-sm font-medium block">{card.address}</span>
                      {card.map_link && (
                        <a
                          href={card.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
                        >
                          View on Map
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3 justify-center flex-wrap">
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
                          backgroundColor: card.theme?.primary || '#3B82F6',
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
              <div className="mt-6 pt-6 border-t border-gray-200">
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Products & Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.filter(p => p.is_active).map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
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
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
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
                      
                      <div className="mb-4 text-gray-700">
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Play className="w-6 h-6 text-purple-600" />
                  Media Gallery
                </h2>
                
                {/* Featured Media */}
                {mediaItems[currentMediaIndex] && (
                  <div className="mb-6">
                    <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                      {mediaItems[currentMediaIndex].type === 'video' ? (
                        <iframe
                          src={getVideoEmbedUrl(mediaItems[currentMediaIndex].url)}
                          title={mediaItems[currentMediaIndex].title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={mediaItems[currentMediaIndex].url}
                          alt={mediaItems[currentMediaIndex].title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {mediaItems[currentMediaIndex].title}
                    </h3>
                    {mediaItems[currentMediaIndex].description && (
                      <p className="text-gray-600">
                        {mediaItems[currentMediaIndex].description}
                      </p>
                    )}
                  </div>
                )}

                {/* Media Navigation */}
                {mediaItems.length > 1 && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCurrentMediaIndex(Math.max(0, currentMediaIndex - 1))}
                      disabled={currentMediaIndex === 0}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      {mediaItems.slice(0, 4).map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentMediaIndex ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          {item.type === 'video' ? (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-600" />
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentMediaIndex(Math.min(mediaItems.length - 1, currentMediaIndex + 1))}
                      disabled={currentMediaIndex === mediaItems.length - 1}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Reviews & Testimonials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <a
                      key={review.id}
                      href={review.review_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.title}</h3>
                          <p className="text-sm text-gray-500">External Reviews</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">View Reviews</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {products.length === 0 && mediaItems.length === 0 && reviews.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Connect with {card.title || 'this professional'}
                </h3>
                <p className="text-gray-600 mb-6">
                  Use the contact information on the left to get in touch.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="https://review.sccinfotech.com/scc.png"
              alt="SCC Infotech LLP"
              className="w-8 h-8"
            />
            <span className="text-lg font-bold text-gray-900">SCC Infotech LLP</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Powered by AI • Digital Business Card Platform
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create Your Own Card
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </a>
        </div>
      </footer>
    </div>
  );
};

// Helper function to get video embed URL
function getVideoEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}