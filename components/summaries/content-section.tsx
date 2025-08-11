export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Compact Points Grid */}
      <div className="grid gap-3">
        {points.map((point, index) => {
          const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
          
          if (!isEmpty) return null;
          
          if (hasEmoji) {
            return <EmojiPoint key={`point-${index}`} point={point} />;
          }
          
          return <RegularPoint key={`point-${index}`} point={point} />;
        })}
      </div>
    </div>
  );
}

function parsePoint(point: string) {
  const isMainPoint = /^\s*\d+\./.test(point);
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u.test(point);
  const isEmpty = point.trim() !== '';
  
  return { isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^\s*[-•]\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji})\s*(.*)/u);
  if (!matches) return null;
  
  return {
    emoji: matches[1],
    text: matches[2],
  };
}

const EmojiPoint = ({ point }: { point: string }) => {
  const parsedPoint = parseEmojiPoint(point);
  
  if (!parsedPoint) {
    return <RegularPoint point={point} />;
  }
  
  const { emoji, text } = parsedPoint;
  
  return (
    <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="text-base flex-shrink-0">
          {emoji}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 transition-all duration-200">
      <div className="flex items-start gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2 flex-shrink-0"></div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {point}
        </p>
      </div>
    </div>
  );
};