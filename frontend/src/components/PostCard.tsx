import { useState } from "react";
import { Clock, MapPin, MessageCircle, Heart, Shield } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CommentSection, Comment } from "./CommentSection";

interface PostCardProps {
  id: string;
  type: "lost" | "found" | "verified";
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  faculty: string;
  category: string;
  timeAgo: string;
  author: {
    name: string;
    avatar?: string;
  };
  isVerified?: boolean;
  initialComments?: Comment[];
  likes: number;
  onAddComment?: (postId: string, content: string) => void;
  onClaim?: () => void;
}

export function PostCard({
  id,
  type,
  title,
  description,
  imageUrl,
  location,
  faculty,
  category,
  timeAgo,
  author,
  isVerified = false,
  initialComments = [],
  likes,
  onAddComment,
  onClaim
}: PostCardProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `${Date.now()}`,
      author: {
        name: "Anda",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      content,
      timeAgo: "Baru saja"
    };
    
    setComments([...comments, newComment]);
    
    if (onAddComment) {
      onAddComment(postId, content);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <ImageWithFallback
              src={author.avatar || "/placeholder-avatar.jpg"}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900">{author.name}</p>
              {isVerified && (
                <Shield className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">{faculty}</p>
          </div>
        </div>
        <Badge 
          variant={type === "lost" ? "destructive" : "default"}
          className={
            type === "lost" 
              ? "bg-red-100 text-red-800" 
              : type === "verified"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
              : "bg-green-100 text-green-800"
          }
        >
          <div className="flex items-center space-x-1">
            {type === "verified" && <Shield className="w-3 h-3" />}
            <span>
              {type === "lost" ? "HILANG" : type === "verified" ? "VERIFIED" : "DITEMUKAN"}
            </span>
          </div>
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>

        {/* Image */}
        <div className="rounded-lg overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {timeAgo}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
              {likeCount}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={isCommentsOpen ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments.length}
            </Button>
          </div>
          {type !== "verified" && (
            <Button 
              size="sm" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                if (onClaim) onClaim();
              }}
            >
              {type === "lost" ? "Saya Menemukan" : "Ini Milik Saya"}
            </Button>
          )}
          {type === "verified" && (
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 font-medium">Barang Telah Dikembalikan</span>
            </div>
          )}
        </div>

        {/* Comments Section */}
        {isCommentsOpen && (
          <CommentSection
            postId={id}
            comments={comments}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </Card>
  );
}