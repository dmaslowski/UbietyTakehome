import React from 'react';
import { Image } from 'react-native';
import { useTheme } from '../providers/themeContext';
const defaultAvatarUrl = require('../../assets/images/default-avatar.png');
type AvatarProps = {
    imageUrl: string;
    size?: number;
};

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    const { imageUrl, size } = props;
    const { theme } = useTheme();

    return (
            <Image
                source={ imageUrl === '' ? defaultAvatarUrl : { uri: imageUrl }}
                style={{
                    borderColor: theme.color.primary,
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