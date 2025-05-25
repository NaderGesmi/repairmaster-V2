export async function uploadImage(file: File | string): Promise<{ url: string; public_id: string }> {
    try {
        let data: string;

        if (typeof file === 'string') {
            // If it's already a base64 string or URL
            data = file;
        } else {
            // Convert File to base64
            data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        }

        const response = await fetch('/api/cloudinary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
} 