
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Clock } from "lucide-react";

interface AutomationCardProps {
  title: string;
  description: string;
  price: string;
  rating: number;
  executions: string;
  category: string;
}

const AutomationCard = ({ title, description, price, rating, executions, category }: AutomationCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
          {category}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Play className="h-4 w-4" />
          <span>{executions} runs</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>2-5 min setup</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">{price}</div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Deploy Now
        </Button>
      </div>
    </div>
  );
};

export default AutomationCard;
