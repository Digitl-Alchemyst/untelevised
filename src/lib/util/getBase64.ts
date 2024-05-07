import { getPlaiceholder } from 'plaiceholder';

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    console.log(base64);

    return base64;
  } catch (e) {
    if (e instanceof Error) console.error(e.stack);
    return null;
  }
}

export default async function blurredImgUrl(images: BlurredImages): Promise<Image[]> {
  // Make all request in parrallel and collect the unresolved promises
  // const base64Promises = images.photos.map((photo) => getBase64(photo.src.large));

  // Resolve all Promises
  // const base64Results = await Promise.all(base64Promises);

  const blurredPhotos: Image[] = images.photos.map((photo, index: number) => {
    // photo.blurDataURL = base64Results[index];
    return photo;
  });
  return blurredPhotos;
}
