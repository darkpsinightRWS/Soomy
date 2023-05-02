import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  updatePack,
  updatePackImage,
  clearPackErrors,
  fetchPackList,
} from "../../../redux/packSlice";
import { setPackToggleUpdate } from "../../../redux/modalSlice";
const styles = {
  container: {
    display: "flex",
    maxWidth: "19rem",
    maxHeight: "190px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
  },
  preview: {
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "19rem", maxHeight: "150px" },
  delete: {
    cursor: "pointer",
    border: "1px gray solid",
    height: "40px",
    width: "100%",
  },
};
const update = () => {
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [Packlist, setPacklist] = useState({});
  const [PacklistEdit, setPacklistEdit] = useState({});
  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const {
    editedPack,
    updatePackErrors,
    loadingUpdatePack,
    PackeditSuccess,
    PackImageEditSuccess,
    Packs,
  } = pack;
  const { packToggleUpdate } = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);
  const { name, description, logo } = editedPack;
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleChangeEdit = (e) => {
    setPacklistEdit({ ...Packlist, [e.target.name]: e.target.value });
  };
  const handleSubmitEdit = () => {
    dispatch(clearPackErrors());
    dispatch(
      updatePack({
        id: editedPack._id,
        data: PacklistEdit,
        page: Packs?.page,
      })
    );
    if (selectedImage) {
      dispatch(
        updatePackImage({
          id: editedPack._id,
          file: selectedImage,
          page: Packs?.page,
        })
      );
    }
  };

  const clearStateEdit = () => {
    setModalShowEdit(false);
    setPacklistEdit({ description: "", name: "", logo: "" });
    setSelectedImage();
    dispatch(clearPackErrors());
  };
  useEffect(() => {
    setPacklistEdit({ name, description, logo });
  }, [editedPack]);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchPackList()).then((res) => {
      setLoader(false);
      setShowSearch(false);
    });
  }, []);
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  return (
    <div>
      <Modal
        show={packToggleUpdate}
        onHide={dispatch(setPackToggleUpdate(false))}
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Packs
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div
                className="upload_image_edit mt-4 mb-4 mx-auto"
                style={{
                  backgroundImage: `url(${PacklistEdit?.logo?.imageURL})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                <span>Upload Image</span>
                <input
                  accept="image/*"
                  type="file"
                  className="photo-input"
                  onChange={imageChange}
                />
              </div>
            )}
            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />

                <button onClick={removeSelectedImage} style={styles.delete}>
                  {/*  <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom de la Packs{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom"
              name="name"
              value={PacklistEdit.name}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              Description{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              placeholder="Description de la Packs"
              name="description"
              value={PacklistEdit.description}
              onChange={(e) => handleChangeEdit(e)}
            ></textarea>
          </div>

          {loadingUpdatePack && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updatePackErrors && (
            <div className="alert alert-danger" role="alert">
              {updatePackErrors}
            </div>
          )}
          {(PackeditSuccess || PackImageEditSuccess) && (
            <div className="alert alert-success" role="alert">
              Packs Mis a Jour!
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={clearStateEdit}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitEdit}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default update;
