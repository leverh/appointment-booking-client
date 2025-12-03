// Utility to map stylist data to local images
// In production, photo_url would come from cloud storage (S3, Cloudinary, etc.)
// For demo purposes, I map names to local public folder images

export const getStylistPhoto = (stylist) => {
  // If photo_url exists in database and is not null, use it
  if (stylist.photo_url && stylist.photo_url !== null) {
    return stylist.photo_url;
  }

  // Otherwise, map names to local images for demo
  const imageMap = {
    'emma schmidt': '/images/stylists/emma-schmidt.webp',
    'lucas weber': '/images/stylists/lucas-weber.webp',
    'sofia müller': '/images/stylists/max-fischer.webp',
    'max fischer': '/images/stylists/sofia-muller.webp'
  };

  const normalizedName = stylist.name.toLowerCase();
  
  // Return mapped image or default placeholder
  return imageMap[normalizedName] || '/images/stylists/default-avatar.jpg';
};