export function findScrollParent(elem: HTMLElement): HTMLElement | null {
    let scrollParent = elem.parentElement
    while (scrollParent && scrollParent.scrollHeight <= scrollParent.clientHeight) {
        scrollParent = scrollParent.parentElement
    }
    return scrollParent
}
