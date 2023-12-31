import { MyPins } from "../Pins";
import { thunkGetPins } from "../../store/pin";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreatePinButton from "../CreatePinButton";
import ProfilePage from "../ProfilePage";
import Masonry from "react-masonry-css";
import "./index.css";

export default function PinViews() {
  const dispatch = useDispatch();
  const pinsObj = useSelector((state) => state.pins);
  const pinValues = Object.values(pinsObj.pins);
  const sessionUser = useSelector((state) => state.session.user);
  const pinOwner = pinValues.filter(
    (pin) => pin.userId === sessionUser.id
  );

  const columnsObj = {
    default: 7,
    1750: 6,
    1500: 5,
    1265: 4,
    1020: 3,
    775: 2,
    525: 1,
  };

  useEffect(() => {
    dispatch(thunkGetPins());
  }, [dispatch]);

  return (
    <div>
      <ProfilePage />
      <CreatePinButton />
      <Masonry
        breakpointCols={columnsObj}
        className="my-pins-masonry-grid"
        columnClassName="my-pins-masonry-grid_column"
      >
        {pinOwner.length ? ( pinOwner.map((ele) => {
          return <MyPins key={ele.id} pin={ele} imageUrl={ele.imageUrl} />;
        })) : <div style={{width: '430px'}}>You currently have no pins, click above to create your first!</div>}
      </Masonry>
    </div>
  );
}
