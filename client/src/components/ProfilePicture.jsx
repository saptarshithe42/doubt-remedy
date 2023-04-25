import React from "react"
import { useState } from "react"
import { UserState } from "../context/AuthContext"

// styles
import "./ProfilePicture.css"

// components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePicture({ src, username }) {

	const { user } = UserState()
	const [updateRequest, setUpdateRequest] = useState(false)
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailError, setThumbnailError] = useState(null)

	const handleThumbnailChange = (e) => {

		// to reset any selected image
		setThumbnail(null)

		let selected = e.target.files[0]  // selecting first element of array of files
		console.log(selected)

		if (!selected) {
			setThumbnailError("Please select a file")
			return
		}

		if (!selected.type.includes("image")) {
			setThumbnailError("selected file must be an image")
			toast.error("selected file must be an image", {
				position : "top-center"
			})
			// alert("selected file must be an image")
			return
		}

		// in case of no error
		setThumbnail(selected)
		setThumbnailError(null)

		console.log("thumbnail updated")
	}


	const updatePicture = async () => {

		try {
			/*
			const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`

			const img = await projectStorage.ref(uploadPath).put(thumbnail)

			const imgUrl = await img.ref.getDownloadURL()  // getting the url of the image

			// add display name to user

			await user.updateProfile({ photoURL: imgUrl })

			setUpdateRequest(false)

			window.location.reload(true);
			*/

			const formData = new FormData();
			formData.append('file', thumbnail);
			formData.append('upload_preset', 'doubt-remedy');
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/dsuc8ju8e/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);
			const data = await response.json();

			// console.log(data.secure_url);

			

			const res = await fetch("/api/update_profile_picture", {

				method : "POST",
				headers: {
                    "Content-Type": "application/json"
                },

				body : JSON.stringify({imgUrl :  data.secure_url})
				
			})

			const userData = localStorage.getItem("userInfo");
			let userInfo = JSON.parse(userData);

			userInfo.imgUrl = data.secure_url;

			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			
			toast.success("Profile picture updated successfully", {
				position : "top-center"
			})

			window.location.reload(false);

			// setImageUrl(data.secure_url);


		}
		catch (err) {
			toast.error("Error occurred", {
				position : "top-center"
			})
		}

	}

	const cancelRequest = () => {
		setUpdateRequest(false)
	}

	return (
		<div className="profile-div">
			{/* <ToastContainer /> */}
			<img src={src} className="profile-img" />
			<p>{username}</p>
			{!updateRequest &&
				<button
					className="btn btn-primary"
					onClick={() => { setUpdateRequest(true) }}
				>
					Update Picture
				</button>
			}
			{updateRequest &&
				<div className="input-div">
					<input
						type="file"
						onChange={handleThumbnailChange}
						required
						className="img-input-box"
					/>

					{!thumbnailError && thumbnail && <button className="btn btn-primary"
						onClick={updatePicture}
					>Update</button>}

					<button className="btn btn-primary"
						onClick={cancelRequest}
					>Cancel</button>
				</div>

			}
		</div>
	)
}

export default ProfilePicture