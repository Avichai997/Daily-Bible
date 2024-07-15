export interface IPostComments {
  comment: string;
  user: string;
}

const PostComments = ({ comments }: IPostComments) => {
  const handleAddComment = () => {
    console.log('add comment');
  };

  return (
    <div>
      <button onClick={handleAddComment}>Add Comment</button>
      {comments?.map((comment, index) => (
        <div key={index}>
          <p>{comment.comment}</p>
          <p>{comment.user}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
