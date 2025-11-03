import { Clock, MapPin, X, Shield, Heart, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CommentSection, Comment } from "./CommentSection";
import { ScrollArea } from "./ui/scroll-area";

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
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
    likes: number;
    comments: Comment[];
  };
  onAddComment: (postId: string, content: string) => void;
  onClaim: () => void;
}

export function PostDetailModal({ isOpen, onClose, post, onAddComment, onClaim }: PostDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="bg-black relative">
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Side - Details & Comments */}
          <div className="flex flex-col">
            <DialogHeader className="p-6 pb-4 border-b">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <ImageWithFallback
                      src={post.author.avatar || "/placeholder-avatar.jpg"}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      {post.isVerified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.faculty}</p>
                  </div>
                </div>
                <Badge 
                  variant={post.type === "lost" ? "destructive" : "default"}
                  className={
                    post.type === "lost" 
                      ? "bg-red-100 text-red-800" 
                      : post.type === "verified"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {post.type === "lost" ? "HILANG" : post.type === "verified" ? "VERIFIED" : "DITEMUKAN"}
                </Badge>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-4">
                {/* Title & Description */}
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-700">{post.description}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {post.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.timeAgo}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments.length}
                    </Button>
                  </div>
                  {post.type !== "verified" && (
                    <Button 
                      size="sm" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      onClick={onClaim}
                    >
                      {post.type === "lost" ? "Saya Menemukan" : "Ini Milik Saya"}
                    </Button>
                  )}
                </div>

                {/* Comments */}
                <div className="border-t pt-4">
                  <CommentSection
                    postId={post.id}
                    comments={post.comments}
                    onAddComment={onAddComment}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
