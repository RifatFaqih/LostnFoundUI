import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timeAgo: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
}

export function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error("Komentar tidak boleh kosong");
      return;
    }

    onAddComment(postId, newComment.trim());
    setNewComment("");
    toast.success("Komentar berhasil ditambahkan");
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      {/* Comments List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Belum ada komentar. Jadilah yang pertama berkomentar!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <ImageWithFallback
                  src={comment.author.avatar || "/placeholder-avatar.jpg"}
                  alt={comment.author.name}
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900">{comment.author.name}</p>
                  <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            alt="You"
            className="w-full h-full object-cover"
          />
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
