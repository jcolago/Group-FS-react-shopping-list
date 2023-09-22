import "./ShoppingListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
export default function ShoppingListItem({
  item,
  markAsPurchased,
  deleteItem,
}) {
  return (
    <div className="item-card">
      <h3 className="item-name">{item?.name}</h3>
      <div className="item-details">
        <span>{item?.quantity}</span>
        <span className="item-unit">{item?.unit}</span>
      </div>
      <div className="item-actions">
        {item.completed ? (
          <span className="purchased-label">Purchased</span>
        ) : (
          <button
            className="purchase-btn"
            onClick={() => markAsPurchased(item.id)}
          >
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className="clipboard-icon"
            />
          </button>
        )}
        <button className="delete-btn" onClick={() => deleteItem(item.id)}>
          <FontAwesomeIcon icon={faTrash} className="trash-icon" />
        </button>
      </div>
    </div>
  );
}

{
  /* <FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#d05249",}} /> */
}
