import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, singOut } from "../../lib/supabase";
import useSupabase from "../../lib/useSupabase";

import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useSupabase(() => getUserPosts(user.id));
  const logout = async () => {
    await singOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-full justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-full'
                resizeMode='cover'
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle='mt-5'
              titleStyle='text-lg'
            />
            <View className='mt-1 flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle='Videos'
                containerStyle='mr-10'
                titleStyle='text-xl'
              />
              <InfoBox title='1.2k' subtitle='Followers' titleStyle='text-xl' />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No Videos found for this search'
          />
        )}
      />
    </SafeAreaView>
  );
};
export default Profile;
