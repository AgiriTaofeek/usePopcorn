import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(defaultRating);

  const handleRate = (id) => {
    setRating(id);
    onSetRating(id);
  };

  const handleHoverIn = (id) => {
    setTempRating(id);
  };
  const handleHoverOut = () => {
    setTempRating(0);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            rating={rating}
            tempRating={tempRating}
            id={i + 1}
            onRate={handleRate}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
            color={color}
            size={size}
          />
        ))}
      </div>
      {/* Recall (||) returns the first truthy value and if all are falsy, return the last falsy */}
      <p style={textStyle}>
        {/* We want to display a message instead of the rating number if we add messages  prop array to this component.  */}
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

const startContainerStyle = {
  display: "flex",
  gap: "4px",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};
export default StarRating;
