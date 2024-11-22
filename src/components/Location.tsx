interface LocationSearchProps {
  city: string;
  setCity: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
}
const Location: React.FC<LocationSearchProps> = ({
  city,
  handleKeyDown,
  error,
  setCity,
}) => {
  return (
    <>
      <div className="weather-right__location">
        <div className="weather-right__location-cont">
          <input
            type="text"
            name="location"
            autoComplete="off"
            placeholder="Search Location..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            className="weather-right__search"
            src={`${process.env.PUBLIC_URL}/img/icons/search.svg`}
            alt="Описание"
          />
        </div>
        {error && (
          <div className="weather-right__error">
            <p>The city wasn't found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Location;
