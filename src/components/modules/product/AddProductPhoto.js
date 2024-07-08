import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import $ from 'jquery';
import {useParams, useNavigate} from "react-router-dom";
import axiosClient from "../../../axios";
import Swal, {isLoading} from "sweetalert2";

const AddProductPhoto = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [photos, setPhotos] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);



    const handlePhotoUpload = () => {
        setIsLoading(true)
        axiosClient.post(`/product-photo-upload/${params.id}`, {photos}, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
                setProgress(progress)
            }
        }).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            navigate('/product')
        })
        //     .catch(errors => {
        //     setIsLoading(false)
        //     if (errors.response.status == 422) {
        //         setErrors(errors.response.data.errors)
        //     }
        // })
    }

    const handlePhotoUploadInput = (e) => {
        let images = e.target.files;
        for (let i = 0; i < images.length; i++ ){
            let reader = new FileReader()
            reader.onloadend = () => {

                setPhotos(prevState => ({
                    ...prevState,
                    [i]:{
                        ...prevState[i], photo: reader.result,
                        ...prevState[i], is_primary: i == 0 ? 1 : 0,

                    }
                }))
            }
            reader.readAsDataURL(images[i])
        }
    }

    const handlePrimaryPhoto = (key) => {
        for (let i= 0; i< Object.keys(photos).length; i++){
            setPhotos(prevState => ({
                ...prevState,
                [i]:{
                    ...prevState[key], is_primary: i == key ? 1 : 0,
                }
            }))
        }
    }

    const handlePhotoInputField = () => {
        $('#photo_input').trigger('click')
    }

    useEffect(() => {
    }, [photos])

    return (
        <>
            <BreadCrumb title={'Ajouter les photos de la marque'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Ajouter les photos de la marque'}
                                link={'/product'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                            />
                        </div>
                        <div className="card-body">
                            <div className="photo-upload-container">
                                <div className="icon" onClick={handlePhotoInputField}>
                                    <i className="fa-solid fa-camera fa-2x"/>
                                </div>
                            </div>
                            <input
                                id={'photo_input'}
                                type="file" className={'d-none'}
                                multiple={true}
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={handlePhotoUploadInput}
                            />
                            <div className="row">
                                {Object.keys(photos).map((key) => (
                                    <div className="col-md-2 my-3" key={key}>
                                       <img onClick={()=> handlePrimaryPhoto(key)} src={photos[key].photo} className={photos[key].is_primary == 1 ? 'primary-photo img-thumbnail preview-photo' : 'img-thumbnail preview-photo'} alt="Photo preview"/>
                                   </div>
                                ))}

                                <div className="row align-items-center">
                                    <div className="col-md-9">
                                        <div className="progress" style={{display: `${progress < 1 ? 'none' : 'block'}`}}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{width: `${progress}%` }}>
                                                {`${progress}%`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-end">
                                        <button className={'btn theme-button'} disabled={isLoading} onClick={handlePhotoUpload} dangerouslySetInnerHTML={{__html: isLoading ? ' <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Chargement... ' : ' Enregistrer les photos ' }}/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProductPhoto;