import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import RepoItem from '../components/RepoItem';
import RepoModal from '../components/RepoModal';
import ShimmerRepoItem from '../components/ShimmerRepoItem';
import {
  fetchRepos,
  resetRepos,
  startRefresh,
} from '../features/repos/reposSlice';
import { RootState, AppDispatch } from '../app/store';
import { Colors } from '../theme/theme';

const RepoListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, page, loading, refreshing, daysFilter } = useSelector(
    (state: RootState) => state.repos,
  );

  const [search, setSearch] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    dispatch(fetchRepos({ page: 1, days: daysFilter }));
  }, [daysFilter]);

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase()),
  );

  const loadMore = () => {
    if (!loading) {
      dispatch(fetchRepos({ page, days: daysFilter }));
    }
  };

  const onRefresh = () => {
    dispatch(startRefresh());
    dispatch(fetchRepos({ page: 1, days: daysFilter }));
  };

  const onFilterChange = (days: number) => {
    dispatch(resetRepos(days));
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        selected={daysFilter}
        onChange={onFilterChange}
        search={search}
        onSearch={setSearch}
      />

      {loading && repos.length === 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <ShimmerRepoItem />}
        />
      ) : (
        <FlatList
          data={filteredRepos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RepoItem repo={item} onPress={() => setSelectedRepo(item)} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
            />
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : null
          }
        />
      )}

      <RepoModal
        visible={!!selectedRepo}
        repo={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />
    </View>
  );
};

export default RepoListScreen;
