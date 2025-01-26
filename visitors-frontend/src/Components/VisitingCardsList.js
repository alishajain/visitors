import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVisitingCards } from "../API/ImageApi";
import "../Styles/CardList.css";

const VisitingCardsList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getAllVisitingCards();
        const data = response.data.map((card) => ({
          ...card,
          VisitingCard: card.VisitingCard ? card.VisitingCard.replace(/\\/g, "/") : null,
        }));
        setCards(data);
        setFilteredCards(data);
      } catch (err) {
        setError("Error fetching visiting cards.");
        console.error(err);
      }
    };
    fetchCards();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = cards.filter(
        (card) =>
          card.VisitorName.toLowerCase().includes(value.toLowerCase()) ||
          card.Id.toString().includes(value)
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="visiting-cards-list-container">
      <h1>Visiting Cards</h1>
      <button onClick={handleBack} className="back-button">Back</button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Visitor Name or ID"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {filteredCards.length === 0 ? (
        <div className="no-results">No cards found.</div>
      ) : (
        <div className="cards-container">
          {filteredCards.map((card) => (
            <div key={card.Id} className="card">
              <div className="card-image">
                <img
                  src={`http://localhost:5000/${card.VisitingCard}`}
                  alt={card.VisitorName}
                  className="card-thumbnail"
                  onClick={() => handleImageClick(`http://localhost:5000/${card.VisitingCard}`)}
                />
              </div>
              <div className="card-details">
                <h3>{card.VisitorName}</h3>
                <p>Id: {card.Id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="close-modal">&times;</button>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitingCardsList;
