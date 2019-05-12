import ACTIONS from '../../constants/ACTIONS';

const initialState = {
    cameraRollPhotos: [],
    hasMore: true,
    totalPhotos: 0,
    lastPhotoCursor: undefined,
    cameraField: undefined,
    cameraHeading: undefined,
    cameraCopy: undefined,
    cameraType: 'back',
    photo: undefined,
    mask: 'document'
};

export default function cameraReducer(state = initialState, action) {
    let cameraRollPhotos;
    console.log('action.type', action.type)
    switch (action.type) {
        case ACTIONS.GET_CAMERA_ROLL_SUCCESS:
            cameraRollPhotos = [
                ...state.cameraRollPhotos,
                ...action.photos.edges,
            ];
            return {
                ...state,
                cameraRollPhotos,
                totalPhotos: cameraRollPhotos.length,
                hasMore: action.photos.page_info.has_next_page,
                lastPhotoCursor: action.photos.page_info.end_cursor,
            };

        case ACTIONS.FLIP_CAMERA:
            return {
                ...state,
                cameraType: state.cameraType === 'back' ? 'front' : 'back',
            }

        case ACTIONS.ACTIVATE_CAMERA:
            return {
                ...state,
                cameraField: action.cameraField,
                cameraType: action.cameraType,
                cameraHeading: action.cameraHeading,
                cameraCopy: action.cameraCopy,
                photo: action.photo,
                mask: action.mask
            }

        case ACTIONS.TAKE_CAMERA_PHOTO:
            return {
                ...state,
                photo: action.photo
            }

        case ACTIONS.RETAKE_PHOTO:
            return {
                ...state,
                photo: undefined
            }

        default:
            return { ...state };
    }
}
