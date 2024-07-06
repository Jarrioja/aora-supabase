import { View, Text, Image } from "react-native";
import { router } from "expo-router";

import { images } from "../constants";
import CustomButton from "./CustomButton";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className='px-4 items-center justify-center'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='font-psmeibold text-xl text-white mt-2'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
      <CustomButton
        title='Create a video'
        handlePress={() => router.push("/create")}
        containerStyles='w-full mt-5'
      />
    </View>
  );
};
export default EmptyState;
