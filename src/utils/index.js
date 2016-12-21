export function getStyleFromProps(prop_style_keys = [], props = {}) {
    let style = {};
    prop_style_keys.map((prop_style_key) => {
        const prop_style_value = props[prop_style_key];
        if (prop_style_value !== undefined && prop_style_value !== null && prop_style_value !== false) {
            style = {
                ...style,
                [prop_style_key]: prop_style_value
            }
        }
        return prop_style_key;
    });
    if (props.style) {
        style = {
            ...style,
            ...props.style
        }
    }
    return style;
}

export function getDeepObject(object, defaultValue, ...keysDeep) {
    let cloneObject = object;
    let value = defaultValue;

    for (var i = 0; i < keysDeep.length; i++) {
        const keyDeep = keysDeep[i];
        if (i > 0) {
            if (cloneObject[keyDeep]) {
                value = cloneObject[keyDeep];
                cloneObject = cloneObject[keyDeep];
            }
            else {
                value = defaultValue;
                break;
            }
        }
        else {
            if (object && object[keyDeep]) {
                value = object[keyDeep];
                cloneObject = object[keyDeep];
            } else {
                break;
            }
        }
    }
    return value;
}

export function toShortString(string, shortStartLength = 20, shortEndLength = 20) {
    if (!string) return '';
    if (string.length > shortStartLength + shortEndLength) {
        const stringBefore = string.substring(0, shortStartLength);
        const stringAfter = string.substring(string.length - shortEndLength);
        return stringBefore + ' ... ' + stringAfter;
    }
    return string;
}

export function cleanProps(clean_key_props, props) {
    let newProps = {...props};
    clean_key_props.map(key => {
        delete newProps[key];
        return {}
    });
    return newProps;
}

export function checkLoadMore({itemPerPage, page, totalItem}) {
    if (!itemPerPage) return false;
    if (page * itemPerPage < totalItem) return true;
    return false;
}
