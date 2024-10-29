import { css } from "@emotion/css";

export const linkCardContentStyle = css`
display: flex;
padding: 0.5rem;
@media (min-width: 420px) {
        font-size: 50px;
      }
`
export const linkCardImageContainerStyle = css`
    width: 75px;
    height: 75px;
`

export const linkCardImageStyle = css`
    width: 100%;
`

export const linkCardHeaderStyle = css`
    font-size: 1rem;
`
export const linkCardDescriptionStyle = css`
    font-size: 0.75rem;
`

export function getLinkCardStyles() {
    return {
        linkCardContentStyle,
        linkCardImageContainerStyle,
        linkCardImageStyle,
        linkCardHeaderStyle,
        linkCardDescriptionStyle
    }
}