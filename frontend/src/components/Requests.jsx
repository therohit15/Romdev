import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.reponse.data);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, gender, age, bio } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <img
                  src={photoUrl}
                  alt="photo"
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{bio}</p>
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Ignored
              </button>
              <button
                className="btn btn-success mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Interested
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
