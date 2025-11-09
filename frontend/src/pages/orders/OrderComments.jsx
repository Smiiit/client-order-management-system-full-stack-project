// src/pages/orders/OrderComments.jsx
import { useEffect, useState } from "react";
import {
  List,
  Button,
  Input,
  Space,
  Modal,
  message,
  Avatar,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { commentsAPI } from "../../api/endpoints";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const OrderComments = ({ order, onUpdated }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const { user } = useSelector((s) => s.auth || {});
  const isAdmin =
    !!user &&
    ((user.role_title && user.role_title.toLowerCase() === "admin") ||
      user.is_admin);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await commentsAPI.getAll();
      const arr = Array.isArray(res) ? res : res?.data || [];
      setList(arr.filter((c) => Number(c.order_id) === Number(order.id)));
    } catch (err) {
      console.error(err);
      message.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (order?.id) fetch();
  }, [order?.id]);

  const canEdit = (c) => {
    if (!user) return false;
    if (isAdmin) return true; // admin can edit
    if (Number(c.created_by) === Number(user.id || user.user_id)) return true;
    return false;
  };
  const canDelete = (c) => {
    if (!user) return false;
    // only creator can delete (per spec)
    if (Number(c.created_by) === Number(user.id || user.user_id)) return true;
    return false;
  };

  const handleCreate = async () => {
    if (!newComment || newComment.trim() === "")
      return message.warning("Add comment text");
    try {
      await commentsAPI.create({ order_id: order.id, comments: newComment });
      setNewComment("");
      fetch();
      onUpdated && onUpdated();
      message.success("Comment added");
    } catch (err) {
      console.error(err);
      message.error("Failed to create comment");
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditingText(c.comments || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async () => {
    if (!editingText || editingText.trim() === "")
      return message.warning("Comment cannot be empty");
    try {
      await commentsAPI.update(editingId, { comments: editingText });
      setEditingId(null);
      setEditingText("");
      fetch();
      onUpdated && onUpdated();
      message.success("Comment updated");
    } catch (err) {
      console.error(err);
      message.error("Failed to update comment");
    }
  };

  const handleDelete = (c) => {
    Modal.confirm({
      title: "Delete comment",
      content: "Are you sure to delete this comment?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await commentsAPI.delete(c.id);
          fetch();
          onUpdated && onUpdated();
          message.success("Comment deleted");
        } catch (err) {
          console.error(err);
          message.error("Failed to delete comment");
        }
      },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          placeholder="Add a comment for this order"
        />
        <Space style={{ marginTop: 8 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Comment
          </Button>
        </Space>
      </div>

      <List
        loading={loading}
        dataSource={list}
        locale={{ emptyText: "No comments yet" }}
        renderItem={(c) => (
          <List.Item
            actions={[
              canEdit(c) && editingId !== c.id ? (
                <Tooltip title="Edit">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => startEdit(c)}
                  />
                </Tooltip>
              ) : null,
              canDelete(c) ? (
                <Tooltip title="Delete">
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDelete(c)}
                  />
                </Tooltip>
              ) : null,
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={
                <Avatar>
                  {(c.created_by_user?.name || "" + c.created_by || "U").charAt(
                    0
                  )}
                </Avatar>
              }
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <strong>
                      {c.created_by_user?.name || c.created_by || "User"}
                    </strong>
                    <span style={{ marginLeft: 8, color: "#6b7280" }}>
                      {c.created_date
                        ? new Date(c.created_date).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>
              }
              description={
                editingId === c.id ? (
                  <div>
                    <TextArea
                      rows={3}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <Space style={{ marginTop: 8 }}>
                      <Button
                        icon={<SaveOutlined />}
                        type="primary"
                        onClick={saveEdit}
                      >
                        Save
                      </Button>
                      <Button icon={<CloseOutlined />} onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </Space>
                  </div>
                ) : (
                  <div style={{ whiteSpace: "pre-wrap" }}>{c.comments}</div>
                )
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrderComments;
