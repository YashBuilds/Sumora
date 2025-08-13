import { MotionDiv } from '@/components/common/motion-wrapper';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const pointVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.6,
    }
  }
};

const emojiVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      duration: 0.8,
    }
  }
};

const bulletVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.5,
      delay: 0.1,
    }
  }
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv 
      className="w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Compact Points Grid */}
      <MotionDiv className="grid gap-3" variants={containerVariants}>
        {points.map((point, index) => {
          const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
          
          if (!isEmpty) return null;
          
          if (hasEmoji) {
            return (
              <MotionDiv
                key={`point-${index}`}
                variants={pointVariants}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <EmojiPoint point={point} />
              </MotionDiv>
            );
          }
          
          return (
            <MotionDiv
              key={`point-${index}`}
              variants={pointVariants}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <RegularPoint point={point} />
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </MotionDiv>
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
        <MotionDiv
          className="text-base flex-shrink-0"
          variants={emojiVariants}
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: { duration: 0.2 }
          }}
        >
          {emoji}
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.3, duration: 0.5 }
          }}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {text}
          </p>
        </MotionDiv>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 transition-all duration-200">
      <div className="flex items-start gap-2">
        <MotionDiv
          className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mt-2 flex-shrink-0"
          variants={bulletVariants}
          whileHover={{
            scale: 1.5,
            backgroundColor: "#f43f5e", // rose-500
            transition: { duration: 0.2 }
          }}
        />
        <MotionDiv
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.2, duration: 0.5 }
          }}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {point}
          </p>
        </MotionDiv>
      </div>
    </div>
  );
};