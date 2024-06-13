import { getPostHandler } from '@Controllers/postController';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


const checkOwnershipOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user.id; // assuming user is attached to req.user

    // Fetch the post from the database
    const post = await getPostHandler(postId);

    if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' });
    }

    // Check if the user is the owner of the post or an admin
    if (post.userId !== userId && req.user.role !== 'admin') {
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: 'You do not have permission to modify this post' });
    }

    // If the user is the owner or an admin, proceed to the next middleware/route handler
    next();
};
export default checkOwnershipOrAdmin; // Use default export

