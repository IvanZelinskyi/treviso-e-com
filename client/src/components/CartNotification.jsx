import { MdDone } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";

const CartNotification = ({ data }) => {
  return (
    <div
      className="cartNotification fadeIn"
      key={`${data.product._id}-${data.action}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {data.action === "add" && <MdDone className="cartNotification-icon" />}
      {data.action === "remove" && (
        <HiOutlineTrash className="cartNotification-icon" />
      )}
      <p>{data.product.name}</p>
      <p>
        {data.action === "add" && "added to cart"}
        {data.action === "remove" && "removed from cart"}
      </p>
    </div>
  );
};

export default CartNotification;
