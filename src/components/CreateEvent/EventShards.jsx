import {FaMapLocationDot} from 'react-icons/fa6'

const EventRegisterationCTA = ({...props}) => {
    return (
    <div className="scroll-btn-container">
        <a className="scroll-btn">⇓</a>
    </div>
    )
}

const Title = ({title, ...props}) => {
    return (
    <div className="title-wrapper">
        <div className="title-container">
            <h1 className="title">{title}</h1>
            {/* <div className="sub-title">{subtitle}</div> */}
            <div className='py-3'>
                <div className='flex items-center'>
                    <span className='icon'>
                        <FaMapLocationDot />
                    </span>
                    <span className='icon-text'>
                        
                    </span>
                </div>
            </div>
        </div>
    </div>
    )
}

const Heading1 = ({children, ...props}) => {
    return (
        <div {...props} className="h1-wrapper">
            <h1>{children}</h1>
        </div>
    )
}

const Paragraph = ({children, ...props}) => {
    return (
        <p {...props}>{children}</p>
    )
}

const EventDetails = ({children, ...props}) => {
    return (
    <div className="event-body-wrapper">
        {children}
    </div>
    )
}

const ImageResponsive = ({children, ...props}) => {
    return (
        <div {...props} className="image-wrapper">
            {children}
        </div>
    )
}

const ListWrapper = ({children, ...props}) => {
    return (
        <div {...props} className="list-wrapper">
            {children}
        </div>
    )
}

const OrderedList = ({children, ...props}) => {
    return (
        <ListWrapper {...props}>
            <ol>
                {children}
            </ol>
        </ListWrapper>
    )
}

const UnorderedList = ({children, ...props}) => {
    return (
        <ListWrapper {...props}>
            <ul>
                {children}
            </ul>
        </ListWrapper>
    )
}

export {
    Title,
    EventDetails,
    Heading1,
    Paragraph,
    ImageResponsive,
    OrderedList,
    UnorderedList,
    EventRegisterationCTA,
}