import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from "../Contexts/UserContext";

const DrawerContent = (props) => {
  const state = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/images/shop.png")}
            size={50}
          />
          <View style={{ marginLeft: 15 }}>
            <Title
              style={{
                fontSize: 16,
                marginTop: 3,
                fontWeight: "bold",
                lineHeight: 20,
              }}
            >
              {state.userName ? state.userName : "Номын дэлгүүр"}
            </Title>
            <Caption style={{ lineHeight: 14 }}>
              {state.userRole ? state.userRole : "Тавтай морил"}
            </Caption>
          </View>
        </View>

        <Drawer.Section style={{ marginTop: 15 }}>
          <DrawerItem
            label="Нүүр"
            onPress={() => props.navigation.navigate("Нүүр")}
            icon={({ color, size }) => (
              <Icon name="home-circle" color={color} size={size} />
            )}
          />

          {state.isLoggedIn ? (
            <View>
              {state.userRole === "admin" && (
                <DrawerItem
                  onPress={() => props.navigation.navigate("Шинэ ном нэмэх")}
                  label="Шинэ ном нэмэх"
                  icon={({ color, size }) => (
                    <Icon
                      name="book-open-page-variant"
                      color={color}
                      size={size}
                    />
                  )}
                />
              )}
              <DrawerItem
                label="Мэссэж илгээх"
                onPress={() => props.navigation.navigate("Notification")}
                icon={({ color, size }) => (
                  <Icon name="message-outline" color={color} size={size} />
                )}
              />

              <DrawerItem
                label="Тохиргоо"
                onPress={() => props.navigation.navigate("Тохиргоо")}
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
              />

              <DrawerItem
                style={{ borderTopColor: "f4f4f4", borderTopWidth: 1 }}
                label="Гарах"
                onPress={() => state.logout()}
                icon={({ color, size }) => (
                  <Icon name="logout" color={color} size={size} />
                )}
              />
            </View>
          ) : (
            <View>
              <DrawerItem
                label="Бүртгүүлэх"
                onPress={() => props.navigation.navigate("Бүртгүүлэх")}
                icon={({ color, size }) => (
                  <Icon name="account-plus" color={color} size={size} />
                )}
              />
              <DrawerItem
                label="Нэвтрэх"
                onPress={() => props.navigation.navigate("Нэвтрэх")}
                icon={({ color, size }) => (
                  <Icon name="login" color={color} size={size} />
                )}
              />
            </View>
          )}
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
