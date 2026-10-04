import React, { Fragment } from 'react';
import { useState } from 'react';
import UserCard from './UserCard';
import { useDispatch } from "react-redux";
import { BASE_URL } from "./utils/constant";
import { addUser } from './utils/userSlice';
import axios from "axios";



const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user ?.about);
  const [photoUrl, setPhotoUrl] = useState(user ?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError('');
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        }
      );
      console.log(res);
      dispatch(addUser(res ?.data ?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (err) {
      setError(err ?.response ?.data);
    }
  };


  return (
    <Fragment>
      {showToast && <div className="toast toast-top toast-center z-50">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
      <div className="flex justify-center items-start py-5 gap-8">
        <div className="flex justify-center mx-5">
          <div className="card bg-neutral-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First name</span>
                  </div>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last name</span>
                  </div>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo Url</span>
                  </div>
                  <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input type="text" value={age} onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input type="text" value={about} onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered w-full max-w-xs" />
                </label>

              </div>
              {error && <p className="text-red-700">{error}</p>}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
      </div>
    </Fragment>

  )
}

export default EditProfile
