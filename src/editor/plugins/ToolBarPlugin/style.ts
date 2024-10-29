import * as styleX from '@stylexjs/stylex';

const toolBarStyles = styleX.create({
    toolbar: {
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 99999,
    },
    toolbarButton: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        fontSize: '24px',
        borderRadius: '4px',
        color: '#cdcdcd',
        ':hover': {
            backgroundColor: '#eeeeee',
        },
    },
    toolbarButtonChecked: {
        color: '#111111',
    },
    fileInput: {
        display: 'none',
    },
    select: {
        position: 'relative',
    },
    selectElement: {
        cursor: 'pointer',
        padding: '8px 32px 8px 8px',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: '#eeeeee',
        },
    },
    selectIcon: {
        position: 'absolute',
        top: '50%',
        right: '8px',
        transform: 'translateY(-50%)',
        color: '#a0a0a0',
        pointerEvents: 'none',
    },
});

export default toolBarStyles;