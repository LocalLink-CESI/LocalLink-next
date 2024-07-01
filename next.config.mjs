/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: "https",
    //             hostname: "lh3.googleusercontent.com",
    //         },
    //         {
    //             protocol: "https",
    //             hostname: "avatars.githubusercontent.com",
    //         }
    //     ],
    // }
};

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});
export default withPWA(nextConfig);
