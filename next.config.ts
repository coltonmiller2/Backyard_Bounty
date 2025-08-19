/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the line you need to add
  output: 'export',
  allowedDevOrigins: ['https://6000-firebase-studio-1755199680969.cluster-2xfkbshw5rfguuk5qupw267afs.cloudworkstations.dev'],
};

export default nextConfig;
