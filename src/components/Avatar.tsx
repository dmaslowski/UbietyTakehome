import React from 'react';
import { Image } from 'react-native';
import { useTheme } from '../providers/themeContext';
const defaultAvatarUrl = require('../../assets/images/default-avatar.png');
type AvatarProps = {
    imageUrl: string;
    present: boolean;
    size?: number;
};

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    const { imageUrl, size, present } = props;
    const { theme } = useTheme();

    return (
        <Image
            source={imageUrl === '' ? defaultAvatarUrl : { uri: imageUrl }}
            style={{
                borderColor: present ? theme.color.primary : theme.color.error,
                borderWidth: theme.borderWidth.md,
                width: size ?? theme.size.md,
                height: size ?? theme.size.md,
                borderRadius: size ?? theme.size.md / 2,
            }}
            resizeMode="cover"
        />
    );
};


export default Avatar;